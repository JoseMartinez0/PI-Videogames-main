/* eslint-disable import/no-anonymous-default-export */
export default {
  name: (value) => {
    if (!value) {
      return "Name is required";
    } else if (value.length < 3 || value.length > 50) {
      return "The name must have between 3 and 50 characters";
    }
    return null;
  },

  description: (value) => {
    if (value.length < 10 || value.length > 200) {
      return "Description must be between 10 and 200 characters long";
    }
  },

  released: (value) => {
    if (!value) {
      return "Release date is required";
    }

    // Convierte la fecha al formato 'YYYY-MM-DD' para la comparación
    const formattedDate = new Date(value).toISOString().split("T")[0];
    const currentDate = new Date().toISOString().split("T")[0];

    if (formattedDate > currentDate) {
      return "The release date cannot be in the future";
    }

    return null;
  },

  rating: (value) => {
    const numericValue = parseFloat(value);

    if (numericValue < 0 || numericValue > 5) {
      return "Rating must be a number between 0 and 5";
    }

    if (value === "" || value === null || value === undefined) {
      return "Rating is required";
    }

    if (!/^\d+(\.\d{1})?$/.test(value)) {
      return "Rating must be a number with up to 1 decimal places";
    }

    return null;
  },

  image: (value) => {
    if (!value) {
      return "Image is require";
    }

    // const allowedExtensions = ["jpg", "jpeg", "png", "gif"]; // Lista de extensiones permitidas
    // const fileExtension = value.split(".").pop().toLowerCase();

    // if (!allowedExtensions.includes(fileExtension)) {
    //   return "Invalid image format. Allowed formats are: jpg, jpeg, png, gif";
    // }

    return null;
  },

  platforms: (value) => {
    if (!value || value.length === 0) {
      return "At least one platform must be selected";
    }
    return null;
  },

  genres: (value) => {
    if (!value || value.length === 0) {
      return "At least one genre must be selected";
    }
    return null;
  },
};
