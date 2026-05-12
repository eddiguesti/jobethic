## Objet interactif dans une pièce.
##
## Chaque objet est un Area2D dans le groupe "interactive". Quand le joueur
## entre dans sa zone et appuie sur E (ou clique), interact() est appelé.
##
## L'objet émet alors un événement au pont JavaScript pour que Next.js
## ouvre le scénario correspondant.
class_name InteractiveObject
extends Area2D

## Identifiant unique de l'objet (ex: "phone", "calendar").
## Doit correspondre aux IDs dans webapp/src/lib/voyage/house-config.ts.
@export var object_id: String = "object"

## Label affiché à côté du joueur quand il est proche.
@export var label: String = "Interagir"

## Liste d'IDs de scénarios à déclencher dans Next.js.
@export var scenario_ids: PackedStringArray = []

## Slug du chapitre (rythme / communication / ...).
@export var chapter_slug: String = "rythme"

@onready var visual: ColorRect = $Visual
@onready var prompt: Label = $Prompt

func _ready() -> void:
	add_to_group("interactive")
	prompt.visible = false

func interact() -> void:
	# Petit feedback visuel
	var tween := create_tween()
	tween.tween_property(visual, "scale", Vector2(1.15, 1.15), 0.1)
	tween.tween_property(visual, "scale", Vector2.ONE, 0.15)

	# Envoie l'événement au pont JS si on est dans un export Web
	JsBridge.send_interaction(object_id, chapter_slug, scenario_ids)

func _on_mouse_entered() -> void:
	prompt.visible = true
	visual.modulate = Color(1.2, 1.2, 1.2)

func _on_mouse_exited() -> void:
	prompt.visible = false
	visual.modulate = Color.WHITE

func _input_event(_viewport: Node, event: InputEvent, _shape_idx: int) -> void:
	# Permet aussi le clic souris pour interagir
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		interact()
