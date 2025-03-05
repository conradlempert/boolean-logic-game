# README

![Screenshot 2025-03-05 at 14 57 50](https://github.com/user-attachments/assets/181f8880-624b-4b1d-b8ba-11ecd450c1b0)

This is a game that helps students learn about boolean logic by solving riddles.

It is written in the game engine phaser.io with a rails backend.

To start the game, run

```
bundle install
rails server
```

and go to http://localhost:3000.

# Documentation

# Frontend

## Rooms

All the levels and learning items can be opened from rooms. As the player walks through the levels of the game, he will unlock new rooms with new items. In the current version there are 4 rooms: `room1`, `room2`, `room3` and `room4`. To show `room1`, just call `room1.show()`.

### Example code

```
var room1 = new Room('room1','room1.jpg', 1);

room1.addItem(new Item(200, 500, 'pigeon', room1,
    {
        type: "animation",
        fps: 30
    }
));

room1.nextRoom = room2;
room1.inDialogue = "hello";
room1.endLevels = [level1, level2];

room1.show();
```
### Constructor

`new Room(name, background, nr)`

Parameter | Description
--- | --- 
`name` | Unique name for the room, which becomes the name of the cached background sprite
`background` | Path to the background image for the room
`nr` | Progress level of this room (`room1.nr` is 1, `room2.nr` is 2. This means when you already made it to `room2`, you can go back to `room1`, but not vice versa.)
`hasItemLock`(optional) | You can set this to true if the room has items that shouldn't be unlocked when you enter the room. You have to set `locked` in the constructor for these Items to make this work

### Attributes

Attribute | Description
--- | ---
`items` | Array with all the items in this room
`activeLevel` | The currently displayed level in this room (`null` without level)
`inDialogue` | Dialogue which is shown when the room opens
`outDialogue` | Dialogue which is shown when the room closes
`endLevels` | Array of levels, which have to be completed to exit this room
`currentEndLevel` | Current index in the `endLevels` Array
`nextRoom` | The room which is shown when all `endLevels` are finished

### State

Each room has a Phaser.IO `state`. This means, that every room has its own `preload()`, `create()`, and `update()` method.

Method | Description
--- | ---
`state.preload()` | Loads the background sprite for this room
`state.create()` | Renders the room, shows the intro dialogue and resets the progress for this room
`state.update()` | Updates the `activeLevel`

### Methods

Method | Description
--- | ---
`showLevel(level)` | Shows the `level`
`endLevel()` | Shows the next level, that is required to exit this room
`closeLevel()` | Closes the `activeLevel`
`render()` | Renders the `background` and all the `items` in this room
`show()` | Activates the `state` (calls `state.create()`)
`addItem(item)` | Adds the Item `item` to the room. See the Item documentation
`unlockItems()` | If the room has items that are not unlocked when you enter the room, you can unlock them with this method. You could call this in a `Level.winAction`

## Levels

A `Level` is a circuit plan with `inputs`, `gates` and `outputs`. There are three types of levels:

Type | Description
--- | ---
`'challenge'` | You must guess the right input combination that is required to get the desired output values
`'choice'` | You must guess the right circuit that is equivalent to a given boolean expression
`'lernItem'` | You can just play around with this level to learn something

To show `level1_1` from `room1`, just call `room1.showLevel(level1_1)`.

### Example code

```
var level1 = new Level('level1', 'challenge', 'A && B');

var a = level1.addInput('A', 3, 2, true);
var b = level1.addInput('B', 3, 6, true);

var and = level1.addGate('and', 9, 4);

var output = level1.addOutput(true, 12, 5);

a.addChild(and);
b.addChild(and);
and.addChild(output);

level1.dialogue = "hello";

room1.showLevel(level1);
```

### Constructor

`new Level(name, type, expression, winAction)`

Parameter | Description
--- | --- 
`name` | Unique name for the level
`type` (optional) | Level type (see table above), is `'challenge'` by default
`expression` (optional) | Boolean expression that equals the level
`winAction` (optional) | Callback function that is called when the level is completed successfully

### Attributes

Attribute | Description
--- | ---
`inputs` | All the inputs in this level
`gates` | All the gates in this level
`outputs` | All the outputs in this level
`completed` | Boolean which indicates if the level is completed successfully
`window` | Object which describes the window in which the level is shown. For example `{ x: 50, y: 50, width: 100, height: 100}`. If not set, the level is shown in fullscreen.
`backgroundImage` | The name of the sprite which is the background for the level. By default it is `'defaultBg'`, which is a sky full of stars right now
`destroyableGraphics` | All the sprites which have to be destroyed when the level is closed
`dialogue` | Dialogue which is shown when the level is shown

### Methods

Method | Description
--- | ---
`show(room)` | Shows this level in the given `room`. Draws all the `inputs`, `gates` and `outputs` and the other UI
`addInput(name, x, y, on, locked)` | Creates an `Input` with these parameters. See the `Input` documentation for more detail
`addGate(type, x, y)` | Creates a `Gate` with these parameters. See the `Gate` documentation for more detail
`addOutput(expected, x, y, name)` | Creates an `Output` with these parameters. See the `Output` documentation for more detail
`update()` | Redraws all the connections and outputs
`checkWin()` | (`'challenge'` type only) Checks if the inputs are set correctly, executes `win()` if they are, and `fail()` if they're not
`checkChoice(index)` | (`'choice'` type only) Checks if the circuit at `index` is the correct one, executes `win()` if it is, and `fail()`if it isn't
`drawConnection(startX, startY, goalX, goalY, on)` | Draws a circuit connection between the start and the goal
`win()` | This is called when you checked a right solution. Executes the `winAction`
`fail()` | This is called when you checked a wrong solution. Takes you back to the room
`registerToDestroy(element)` | When you call this with `element`, it is destroyed when the level is destroyed
`destroy()` | Destroys the level and all the `destroyableGraphics`

## Item

An `Item` is a prop in the room, which does something when the user clicks on it. To create an `Item`, use `room1.addItem(new Item(...))`.

### Example code

```
room1.addItem(new Item(200, 500, 'pigeon', room1,
    {
        type: "animation",
        fps: 30
    }
));
room1.addItem(new Item(70, 500, 'dog', room1,
    {
        type: "level",
        level: level1
    }
));
room1.addItem(new Item(630, 480, 'cat', room1,
    {
        type: "popup",
        popup: catPopup
    }
));
room1.addItem(new Item(530, 300, 'cow', room1, { type: "endlevel" }));
room1.addItem(new Item(370, 200, 'bird', room1)); // action will be { type: 'none' }
```

### Constructor

`new Item(x, y, name, room, action, locked)`

Parameter | Description
--- | ---
`x` | x-coordinate of the top left corner
`y` | y-coordinate of the top left corner
`name` | Sprite name for this item
`room` | The room in which this item is placed
`action` (optional)| Action object, see table below
`locked` (optional)| Set this to `true`, if you don't want the item to be unlocked yet when the player enters the room. You have to set `hasItemLock` in the room constructor as well

### Action

The `action` object defines what happens when the user clicks on the item.

Action Object | Description
--- | ---
`{ type: 'animation', fps: 30 }` | Plays an animation with 30 fps, if the sprite is an animation spritesheet
`{ type: 'level', level: myLevel }` | Shows the Level `'myLevel'`
`{ type: 'popup', popup: myPopup }` | Shows the Popup `'myPopup'`
`{ type: 'endLevel' }` | Shows the next `endLevel` for the current room (See `Room.endLevels`)
`{ type: 'none' }` | Does nothing (default value)

### Methods

Method | Description
--- | ---
`init()` | Draws the item and makes it clickable. This is called automatically when the `room` is rendered
`clickAction()` | Executes the `action`. This is called when the item is clicked

## Input

A switch in a `Level` that has outgoing connection(s). Use `level1.addInput(...)` to create an `Input`, since it automatically creates the reference to the `Level`.

### Example Code

```
var a = level1.addInput('A', 3, 2, true);
var b = level1.addInput('B', 3, 6, true, true); // locked input

var and = level1.addGate('and', 9, 4);

a.addChild(and);
b.addChild(and);
```

### Constructor

`new Input(name, x, y, on, level, locked)`

(please use `Level.addInput(name, x, y, on, locked)`)

Parameter | Description
--- | ---
`name` | Name for the input, which is shown left to the input. If you dont want any text to show, use `''`
`x` | x-position for the input (in grid coordinates)
`y` | y-position for the input (in grid coordinates)
`on` | Boolean that determines whether the input is on or off by default
`level` | Reference to the level
`locked` (optional) | If this is set to true, the input can't be switched by the user. (`false` by default)

### Methods

Method | Description
--- | ---
`init()` | Renders the input and makes it clickable. This is automatically called by `Level.init()`
`show()` | Updates the sprite when the on/off status has changed
`toggle()` | Switches between on and off
`addChild(child)` | Establishes an outgoing circuit connection from the `Input` to the `child`
`destroy()` | Destroys the sprite

## Gate

A gate in a `Level` that has ingoing and outgoing connection(s). Use `level1.addGate(...)` to create a `Gate`, since it automatically creates the reference to the `Level`.

### Example Code

```
var a = level1.addInput('A', 3, 2, true);
var b = level1.addInput('B', 3, 6, true);

var and = level1.addGate('and', 9, 4);
var or = level1.addGate('or', 9, 8);
var not = level1.addGate('not', 9, 12);
var equals = level1.addGate('equals', 9, 16);

var output = level1.addOutput(true, 12, 5);

a.addChild(and);
b.addChild(and);

a.addChild(or);
b.addChild(or);

a.addChild(not); //'not' is the only gate type that has only one input

a.addChild(equals);
b.addChild(equals);

and.addChild(output);
```

### Constructor

`new Gate(type, x, y, level)`

(please use `Level.addGate(type, x, y)`)

Parameter | Description
--- | ---
`type` | `'and'`, `'or'`, `'not'` or `'equals'`
`x` | x-position for the gate (in grid coordinates)
`y` | y-position for the gate (in grid coordinates)
`level` | Reference to the level

### Methods

Method | Description
--- | ---
`init()` | Renders the gate. This is automatically called by `Level.init()`
`addChild(child)` | Establishes an outgoing circuit connection from the `Gate` to the `child`. To establish an ingoing connection, use `addChild(gate)` on the parent.
`drawConnections()` | Draws the connection cables from the parent(s) to this `Gate`. This is called automatically by `Level.update()`
`updateValues(args)` | Recomputes the output of this gate. This is called by the parent(s) if they get updated.
`destroy()` | Destroys the sprite

## Output

An output in a `Level` that has an ingoing connection. Use `level1.addOutput(...)` to create an `Output`, since it automatically creates the reference to the `Level`. To establish an ingoing connection, use `addChild(output)` on the parent.

### Example Code

```
var and = level1.addGate('and', 9, 4);

var output1 = level1.addOutput(false, 12, 5); //has to be off to complete the level
var output2 = level1.addOutput(true, 12, 5, 'X'); //X is displayed right to the gate

and.addChild(output1);
and.addChild(output2);
```

### Constructor

`new Output(expected, x, y, level, name)`

(please use `Level.addOutput(expected, x, y, name)`)

Parameter | Description
--- | ---
`expected` | Boolean that determines whether the output has to be on or off to complete the level
`x` | x-position for the output (in grid coordinates)
`y` | y-position for the output (in grid coordinates)
`level` | Reference to the level
`name` (optional) | Name for the output, which is shown right to the output. If you dont want any text to show, leave this blank

### Attributes

Attribute | Description
--- | --- 
`on` | Boolean that is true when the output is on, and false when it's off

### Methods

Method | Description
--- | ---
`init()` | Renders the output. This is automatically called by `Level.init()`
`drawConnections()` | Draws the connection cables from the parent(s) to this `Output`. This is called automatically by `Level.update()`
`show()` | Updates the sprite when the on/off status has changed
`setValue(on)` | Sets the on/off status to the boolean value of `'on'`
`updateValues(args)` | Recomputes the output of this gate. This is called by the parent(s) if they get updated.
`destroy()` | Destroys the sprite

## Dialogues

A `Dialogue` is a sequence of sentences that are spoken by different characters. Use `new Dialogue('hello')` to create a dialogue manually. If you want a `Dialogue` to appear when the user is entering or leaving a `Room`, you can set `Room.inDialogue` or `Room.outDialogue`. For a `Level`, use `Level.dialogue`.

The dialogues are saved in the language files **/config/locales/de.yml** and **/config/locales/en.yml**.

### Code Example

**/config/locales/de.yml**

```
welcome:
  - "Maus: Hey Erik"
  - "Erik: Hallo Maus"
```

**/assets/javascript/application.js**

```
new Dialogue("welcome", () => { alert("wow") }); //Opens the dialogue right away and alerts "wow" when the dialogue is closed

level1.dialogue = "welcome"; //Opens the dialogue when level1 is shown
room1.inDialogue = "welcome"; //Opens the dialogue when room1 is shown
room1.outDialogue = "welcome"; //Opens the dialogue when the user leaves room1
```

### Constructor

`new Dialogue(i18nScope, callback)`

Parameter | Description
--- | ---
`i18nScope` | The reference to the dialogue in the language file
`callback` (optional) | A function that is called, when the dialogue is closed

### Methods

Method | Description
--- | ---
`draw()` | Shows the dialogue
`textClick()` | Is triggered when the dialogue is clicked. Calls `setUpSpeaker()` or closes the dialogue if it's over
`setUpSpeaker(index)` | Shows the speaker at `index`

## Translations

You can store translations in **/config/locales/de.yml** and **/config/locales/en.yml**.

### Code Examples

**/config/locales/de.yml**

```
hello: "Hallo"
animals:
  dog: "Der Hund"
  cat: "Die Katze"
```

**/config/locales/en.yml**

```
hello: "Hello"
animals:
  dog: "The dog"
  cat: "The cat"
```

**/assets/javascript/application.js**

```
  I18n.locale = "de";
  console.log(I18n.t("hello"));       // Hallo
  console.log(I18n.t("animals.dog"))  // Der Hund

  I18n.locale = "en";
  console.log(I18n.t("hello"))        // Hello
```

# Backend

## Services
The Backend is dockerized. The services are:

1. Web: Rails Server for handling LTI and rendering the frontend
2. Postgres: Database for persistence (not used at the moment)
3. Nginx: Reverse Proxy

To add or remove services you will need to edit the `docker-compose.yml`

## Starting the server via Docker

1. Rename file `.env.sample` to `.env`
2. Modify the values in `.env` **(for production)**
3. Run `$ docker-compose up`


## LTI (1.1)

The app can act as a LTI Tool Provider through the `'/lti'` endpoint.
To start the quiz one must `post` to this endpoint according to the **LTI 1.1** specification.

 
LTI Secrets and Keys can be configured in `config/initializers/lti.rb`

The app is preconfigured for the key `openhpi` the corresponding secret 
must be specified in the `.env` file

### Important LTI Parameters

```
lis_outcome_service_url // For updating the score
launch_presentation_return_url // Url to return to after game was completed
launch_presentation_locale // For setting the quiz locale ('de', 'en')
```
### Implementation

LTI connectivity is handled through the LTI Controller in `app/controllers/lti_controller.rb`

We expose three lti endpoints defined in `config/routes.rb`.

#### post '/lti'

The first endpoint is the entrypoint `'/lti'`, this is mapped to the `create` action of the LTI Controller. Here we save the recievied LTI parameters in the session and try to determine the correct locale.

```
  def create
    session[:lti_launch_params] = lti_params
    session[:locale] = lti_params.fetch('launch_presentation_locale', I18n.default_locale)
    redirect_to '/'
  end
```

#### post '/update_score'


The next endpoint handles the updating of the quiz score.
It is exposed as `'/update_score'` and maps to the `update_score`
action of the LTI Controller. This action is used by posting a score value to the endpoint. The Controller than first requests the current score of the user from the external outcome service and
compares it to the score that was posted. If the posted score is higher than the old score it is send back to the outcome service to be updated.

```
  def update_score
    unless tool_provider.nil?
      old_score = get_current_score
      score = params.permit(:score)[:score]
      if score > old_score
        response = tool_provider.post_replace_result!(score)
        if response.success? || response.processing?
          return render json: { score: score }
        else
          Rails.logger.warn('Outcome could not be posted. Response was: ')
          Rails.logger.warn(response.to_json)
          return render json: {errors: ['Error while transmitting score']}, status: 500
        end
      end
      render json: { score: old_score }
    end
  end
```

#### get '/quiz_finished'

This endpoint allows us to return to the tool provider once the quiz has finished. Here we simply redirect to the `launch_presentation_return_url` if it was passed to the `/lti` endpoint and saved to the session.

```
def return
  if @consumer_url.present?
    redirect_to @consumer_url
  end
end
  
def consumer_url
    @consumer_url ||= session.to_hash.dig('lti_launch_params', 'launch_presentation_return_url')
end
```


#### Tool Provider Object

The actual lti communication is handled trough the gems `ims-lti 1.1.3` and `omniauth-lti`. The gem `omniauth-lti` was added to the repository because changes were necessary to make it work with rails 5. If preferred you can extract it again.

The lti communication is handled through the `tool_provider` object, 
which is implemented by the `ims-lti` gem and initialized in the LTI Controller method `tool_provider`

Here we first check if lti params were saved to the session trough
`lti_launch_params`, which are defined by the `omniauth-lti` gem.
This is the same as calling `session[:lti_launch_params]` directly.
Then we extract the key and secret from the parameters and the configured credentials (`LTI_CREDENTIALS_HASH` in `config/initializers/lti.rb`).

Finally we create the tool_provider object and pass it the key, secret and the rest of the parameters.

This allows it to create a validated connection to the external tool consumer service.

```
  def tool_provider
    unless lti_launch_params.nil?
      key = lti_launch_params['oauth_consumer_key']
      secret = LTI_CREDENTIALS_HASH[key.to_sym]
      tool_provider = IMS::LTI::ToolProvider.new(key,
                                                 secret,
                                                 lti_launch_params)
    end
  end
```
We use the following two methods of this object.

```
// Post the passed score to the external tool consumer
tool_provider.post_replace_result!(score)

// Reads the current score from the external tool consumer
tool_provider.post_read_result!

```


# Issues

## Levels

- Cables drawn upon dialogue boxes (fix: rearrange drawing order)
- Plain input labeling, not much help for user (fix: labeling of gates, pre-coloring of certain cables)
- Required output not easily recognizable (fix: label, maybe coloring)
- User is not given the option of a graceful exit when an error is made (fix: option to stay&play or exit)
- Errors have no consequences in evaluation yet (fix: subtract half points)
- Video not playable in Safari (web is fun!)

## Mobile

- Game not scaleable for various screen sizes (maybe benign because computers and phones have similar screen ratios)

## Miscellaneous

- Dialogues not yet complete
- No translations yet





