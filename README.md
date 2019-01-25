### How To Start

After clone it, just run the following commands:
1. npm install
2. npm start and then it will be available at http://localhost:3000

### More Information
* First thing - chose to use Redux with it because I wanted for each Tile component to be independent from its parent Board component, so the board will not rerender on every change in the tile.
* In addition - once the user adds a soldier, he can drag it from one Tile to another, but only if its have the same color.
* By default - the "Add Soldier" and the "Remove Soldier" buttons are disabled. The add one is enabled once the inputs have numbers of an empty Tile, and the remove has numbers of Tile with a soldier on it.

I work with linux, so it was tested only on on both Chrome and Firefox (in Firefox the Drag and Drop is supported differently so it might not work sometimes).
