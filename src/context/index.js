import React, { useState } from "react";

export const LoginContext = React.createContext({
  logged: false,
  toggleStatus: () => {},
});
