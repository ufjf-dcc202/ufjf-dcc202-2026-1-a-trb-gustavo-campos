import { inicializar, moverDisco, renderizar } from "../services/torre-hanoi.js";

inicializar();

imprimirRetorno();

function imprimirRetorno() {
    console.log(renderizar());
}
