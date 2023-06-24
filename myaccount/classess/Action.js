export default class Action {
    constructor(type, description, amount) {
        this.id = Math.floor(Math.random() * 1001);
        this.type = type;
        this.description = description;
        this.amount = type == "expense" ? -amount : amount
    };
    get(value) {
        return this[value];
    };
    set(value, newValue) {
        this[value] = newValue
    };
}