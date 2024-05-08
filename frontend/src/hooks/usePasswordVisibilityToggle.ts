import { useState } from "react";
import { IconTextType } from "../interface";

export const usePasswordVisibilityToggle = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<IconTextType>({
      type: false,
      visible: true,
    });
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<IconTextType>({
      type: false,
      visible: true,
    });
  
    const togglePasswordVisibility = () => {
      setPasswordVisibility(prevState => ({
        type: !prevState.type,
        visible: !prevState.visible
      }));
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setConfirmPasswordVisibility(prevState => ({
        type: !prevState.type,
        visible: !prevState.visible
      }));
    };
  
    return {
      passwordVisibility,
      confirmPasswordVisibility,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
    };
  };
  