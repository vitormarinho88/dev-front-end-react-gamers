import PropTypes from "prop-types";

import { ContainerButton } from "./styles.js";

export function Button({children}) {
    return (
    <ContainerButton>{children}</ContainerButton>
   )
}
Button.PropTypes = {
    children:PropTypes.string,
};


//children permite que o conteúdo mude sem alterar o componente (composição).
//theme: permite que a aparência mude sem criar ButtonPrimary, ButtonSecondary etc.
//...props mantém o componente transparente: 
// ele não bloqueia nenhuma funcionalidade do elemento nativo.