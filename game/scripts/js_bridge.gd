## Pont entre Godot et Next.js (pour les exports HTML5).
##
## Autoload (singleton accessible via `JsBridge` globalement).
##
## En production : le jeu est embed dans une <iframe> de la page Next.js
## à `/voyage/jeu`. Quand le joueur interagit avec un objet, on appelle
## `window.parent.postMessage(...)` pour notifier la page parente.
##
## Next.js écoute ces messages et affiche le scénario approprié
## en overlay React au-dessus de l'iframe.
##
## En éditeur (run depuis Godot) : on log dans la console à la place.
extends Node

## Envoie un événement d'interaction objet → parent web.
func send_interaction(object_id: String, chapter_slug: String, scenario_ids: PackedStringArray) -> void:
	var payload := {
		"type": "jobethic.interaction",
		"objectId": object_id,
		"chapterSlug": chapter_slug,
		"scenarioIds": Array(scenario_ids),
		"at": Time.get_unix_time_from_system(),
	}
	_post_to_parent(payload)
	print("[JsBridge] interaction: ", payload)

## Envoie un événement de progression (chambre complétée, etc.).
func send_progress(event: String, data: Dictionary = {}) -> void:
	var payload := {
		"type": "jobethic.progress",
		"event": event,
		"data": data,
	}
	_post_to_parent(payload)
	print("[JsBridge] progress: ", payload)

## Méthode interne — utilise JavaScriptBridge si on est sur le Web,
## sinon log seulement (pour debug en éditeur).
func _post_to_parent(payload: Dictionary) -> void:
	if not OS.has_feature("web"):
		return # Pas en mode Web → rien à faire

	var json := JSON.stringify(payload)
	# Échappe les quotes simples pour le JS embarqué
	var escaped := json.replace("'", "\\'")
	# Appelle window.parent.postMessage si disponible
	JavaScriptBridge.eval(
		"if (window.parent && window.parent !== window) {" +
		"  window.parent.postMessage(JSON.parse('" + escaped + "'), '*');" +
		"}"
	)
