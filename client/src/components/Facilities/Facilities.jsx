import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
// import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  // ==================== upload logic
  // const { user } = useAuth0();
  // const {
  //   userDetails: { token },
  // } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

 

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
