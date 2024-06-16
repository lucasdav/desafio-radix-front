import React, { useState, useEffect } from "react"; // Import useEffect
import { useMutation } from "react-query";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import registerEquipments from "../../services/registerEquipments";
import { EquipmentsRegistrationData } from "../../services/registerEquipments/type";
import registerEquipmentById from "../../services/registerEquipmentById";
import getEquipmentById from "../../services/getEquipmentById";
import { AxiosError } from "axios";
import { formatInputDate } from "../../util/formatMask";

interface EquipmentFormProps {
  open: boolean;
  handleClose: () => void;
  equipment?: EquipmentsRegistrationData;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ open, handleClose, equipment }) => {
  const [formData, setFormData] = useState<EquipmentsRegistrationData>({ equipmentId: "", timestamp: "", value: 0 });

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
    }
  }, [equipment]);


  const submitEquipmentData = async (formData: EquipmentsRegistrationData) => {
    try {
      await getEquipmentById(formData.equipmentId);
      return registerEquipmentById(formData.equipmentId, formData);
    } catch (error) {
      const typedError = error as AxiosError;
      if (typedError.response && typedError.response.status === 404) {
        return registerEquipments(formData);
      } else {
        throw typedError;
      }
    }
  };

  const mutation = useMutation(submitEquipmentData, {
    onSuccess: (data) => {
      console.log("Form submitted successfully:", data);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const handleChange = (
    field: keyof EquipmentsRegistrationData,
    value: string | number
  ) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Formulário de equipamento
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Identificador de equipamento"
                  onChange={(e) => handleChange("equipmentId", e.target.value)}
                  value={formData.equipmentId}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type="datetime-local"
                  onChange={(e) => handleChange("timestamp", e.target.value)}
                  value={formData.timestamp ? formatInputDate(formData.timestamp) : ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Valor"
                  type="number"
                  onChange={(e) =>
                    handleChange("value", parseInt(e.target.value, 10))
                  }
                  value={formData.value}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EquipmentForm;