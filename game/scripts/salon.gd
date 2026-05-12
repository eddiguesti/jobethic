## Pièce "Le Salon" — chapitre Rythme.
##
## Scène top-down avec :
## - 4 murs (StaticBody2D + ColorRect visuels)
## - Le joueur (instancié au centre)
## - 4 objets interactifs : phone, calendar, window, door
##
## Quand le joueur interagit (E ou clic), un message est envoyé à Next.js
## qui affiche le scénario en overlay React.
extends Node2D

func _ready() -> void:
	# Notifie Next.js que la pièce est chargée
	JsBridge.send_progress("room_entered", {"room": "salon", "slug": "rythme"})

func _on_close_pressed() -> void:
	# Retour à la maison — envoie un message pour fermer/naviguer
	JsBridge.send_progress("room_exited", {"room": "salon"})
