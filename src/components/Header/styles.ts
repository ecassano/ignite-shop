import { styled } from "@stitches/react";

export const HeaderContainer = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CartButton = styled("button", {
  padding: 12,
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  position: "relative",

  variants: {
    background: {
      green: {
        background: "$green500",
        color: "white",
      },
      gray: {
        background: "$gray800",
        color: "$gray300",
      },
    },
  },

  span: {
    position: "absolute",
    right: -8,
    top: -8,
    width: 24,
    height: 24,
    borderRadius: 12,

    background: "$green500",
    color: "white",
    fontSize: "0.875rem",
    fontWeight: "bold",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const DrawerContainer = styled("div", {
  position: "fixed",
  top: 0,
  right: 0,
  width: 480,
  height: "100%",
  background: "$gray800",
  boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.2)",
  padding: 24,
  transform: "translateX(100%)",
  transition: "transform 0.3s ease-in-out",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",

  variants: {
    open: {
      true: {
        transform: "translateX(0)",
      },
    },
  },
});

export const Overlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 10,
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.3s ease-in-out",

  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "all",
      },
    },
  },
});

export const DrawerHeader = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: 20,

  button: {
    display: "flex",
    alignItems: "center",
    lineHeight: 0,
    padding: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "$gray300",
    cursor: "pointer",
  },
});

export const DrawerContent = styled("ul", {
  listStyle: "none",
  padding: 24,
  margin: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  "& li": {
    marginBottom: "15px",
    fontSize: "1rem",
  },

  h2: {
    fontSize: "$lg",
    marginBottom: "2rem",
  },
});

export const DrawerContentItemsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const DrawerContentItem = styled("div", {
  display: "flex",
  gap: 20,
});

export const DrawerContentItemImageContainer = styled("div", {
  width: 101,
  height: 93,
  borderRadius: 8,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const DrawerContentItemInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 8,

  div: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    fontSize: "0.875rem",
    fontWeight: "lighter",
  },

  button: {
    background: "transparent",
    border: "none",
    color: "$green500",
    cursor: "pointer",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const DrawerContentSummary = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 56,

  "> div": {
    display: "flex",
    flexDirection: "column",
    gap: 8,

    div: {
      display: "flex",
      justifyContent: "space-between",
    },
  },

  button: {
    padding: "1.25rem 2rem",
    borderRadius: 8,
    background: "$green500",
    color: "white",
    border: "none",
    cursor: "pointer",

    "&:hover": {
      background: "$green300",
    },
  },
});
