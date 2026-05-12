## Scène principale — point d'entrée du jeu.
##
## Pour l'instant on charge directement le salon. À terme : un menu
## de sélection des pièces (la map de la maison).
extends Node

@onready var current_room: Node = null

func _ready() -> void:
	JsBridge.send_progress("game_loaded", {})
	_load_room("res://scenes/salon.tscn")

func _load_room(scene_path: String) -> void:
	if current_room:
		current_room.queue_free()
	var scene := load(scene_path) as PackedScene
	if scene:
		current_room = scene.instantiate()
		add_child(current_room)
