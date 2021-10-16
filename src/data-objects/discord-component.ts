import { DiscordButtonStyle } from '../custom-types/discord-button-styles';
import { DiscordComponentType } from '../custom-types/discord-component-types';

export default class DiscordComponent {
    public type!: DiscordComponentType;	    // Component type
    public custom_id?: string;          // A developer-defined identifier for the component, max 100 characters
    public disabled?: boolean = false;  // Whether the component is disabled, default false
    public style?: DiscordButtonStyle;         // One of button styles
    public label?: string;              // Text that appears on the button, max 80 characters	Buttons
    // public emoji ? partial emoji	name, id, and animated	Buttons
    // public url ? string	a url for link - style buttons	Buttons
    // public options ? array of select options	the choices in the select, max 25	Select Menus
    // public placeholder ? string	custom placeholder text if nothing is selected, max 100 characters	Select Menus
    // public min_values ? integer	the minimum number of items that must be chosen; default 1, min 0, max 25	Select Menus
    // public max_values ? integer	the maximum number of items that can be chosen; default 1, max 25	Select Menus
    public components?: DiscordComponent[] = [];  //A list of child components	Action Rows
}