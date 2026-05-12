## Joueur — CharacterBody2D top-down.
##
## Mouvement WASD ou flèches. Espace ou E pour interagir avec l'objet
## le plus proche (s'il y en a un dans la zone d'interaction).
##
## Style : top-down, 4 directions, animation simple (à enrichir plus tard).
extends CharacterBody2D

const SPEED: float = 180.0
const ACCELERATION: float = 1400.0
const FRICTION: float = 1600.0

## Liste des objets interactifs dans la zone du joueur (Area2D).
var nearby_objects: Array[Node] = []

@onready var sprite: ColorRect = $Body
@onready var interact_label: Label = $InteractLabel

func _ready() -> void:
	interact_label.visible = false

func _physics_process(delta: float) -> void:
	var input_vector := Vector2(
		Input.get_axis("move_left", "move_right"),
		Input.get_axis("move_up", "move_down")
	).normalized()

	if input_vector.length() > 0:
		velocity = velocity.move_toward(input_vector * SPEED, ACCELERATION * delta)
	else:
		velocity = velocity.move_toward(Vector2.ZERO, FRICTION * delta)

	move_and_slide()

	# Affiche le label d'interaction si on est près d'un objet
	_update_interact_label()

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("interact") and nearby_objects.size() > 0:
		# Trigger l'objet le plus proche
		var closest := _closest_object()
		if closest and closest.has_method("interact"):
			closest.interact()

func _on_interaction_area_body_entered(_body: Node2D) -> void:
	pass # Pas utilisé pour l'instant (joueur lui-même)

func _on_interaction_area_area_entered(area: Area2D) -> void:
	if area.is_in_group("interactive"):
		nearby_objects.append(area)

func _on_interaction_area_area_exited(area: Area2D) -> void:
	nearby_objects.erase(area)

func _closest_object() -> Node:
	var closest: Node = null
	var min_dist := INF
	for obj in nearby_objects:
		if not is_instance_valid(obj):
			continue
		var dist: float = global_position.distance_to(obj.global_position)
		if dist < min_dist:
			min_dist = dist
			closest = obj
	return closest

func _update_interact_label() -> void:
	if nearby_objects.size() > 0:
		var closest := _closest_object()
		if closest:
			interact_label.text = "[E] " + (closest.get("label") if "label" in closest else "Interagir")
			interact_label.visible = true
			return
	interact_label.visible = false
