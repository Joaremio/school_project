import React, { forwardRef } from "react";
import InputMask from "react-input-mask";

const MaskedInput = forwardRef((props, ref) => (
  <InputMask {...props} inputRef={ref} />
));

export default MaskedInput;
