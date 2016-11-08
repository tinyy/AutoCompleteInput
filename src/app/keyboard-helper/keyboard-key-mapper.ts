import { KeyboardKeys } from './keyboard-keys';

export class KeyMapper {

    static MapKeyBoardKey(key: KeyboardEvent): KeyboardKeys {
        let keyboardKey: KeyboardKeys
        if (key.keyCode === 40) {
            keyboardKey = KeyboardKeys.Down;
        } else if (key.keyCode === 38) {
            keyboardKey = KeyboardKeys.Up;
        } else if (key.keyCode === 13) {
            keyboardKey = KeyboardKeys.Enter;
        }
        else { return KeyboardKeys.KeyNotMapped; }

        return keyboardKey;
    }


}
