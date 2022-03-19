class Egreso extends Dato {
    static countId = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = ++Egreso.countId;
    }

    get id() { return this._id }
}