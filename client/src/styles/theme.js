import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontWeight: 700,
          borderRadius: 9999,
          fontSize: "24px",
          lineHeight: "29px",
          height: "60px",
          boxShadow: "none",
          textAlign: "center",
          border: "none",
          padding: "0.5rem 1.5rem",
          cursor: "pointer",
          position: "relative",
          color: "#FFFFFF",
          background: theme.palette[ownerState.color || "primary"].main,
          "&:before": {
            opacity: 0,
            backgroundColor: "#FFFFFF",
            borderRadius: "inherit",
            bottom: 0,
            color: "inherit",
            content: "''",
            left: 0,
            pointerEvents: "none",
            position: "absolute",
            right: 0,
            top: 0,
            transition: "opacity .2s cubic-bezier(.4,0,.6,1)"
          },
          "&:hover": {
            boxShadow: "none",
            backgroundColor: theme.palette[ownerState.color || "primary"].main
          },
          "&:hover:before": {
            opacity: "0.08"
          }
        })
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "primary",
        fullWidth: true
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "& fieldset": {
            borderRadius: ownerState.multiline ? 20 : 9999,
            borderColor: theme.palette[ownerState.color || "primary"].main,
          },
          "&:hover fieldset": {
            borderColor: theme.palette[ownerState.color || "primary"].main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette[ownerState.color || "primary"].main,
          },
          "& .MuiInputBase-input": {
            padding: ownerState.multiline ? "8px 10px" : "20px 30px"
          },
          "& .MuiInputLabel-root[data-shrink=false]": {
            padding: "4px 16px",
            lineHeight: "23px"
          }
        })
      }
    }
  },
  palette: {
    primary: {
      main: "#496F46"
    },
    yellow: {
      main: "#DBBD70"
    },
    grey: {
      main: "#A6A6A6"
    },
    red: {
      main: "#CA3737"
    }
  }
});