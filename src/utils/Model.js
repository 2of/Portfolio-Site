// mlModel.js

let modelLoaded = false;


export async function loadModel() {
  return new Promise((resolve) => {
    setTimeout(() => {
      modelLoaded = true;
      resolve({ status: "success", message: "Model loaded successfully (mock)." });
    }, 500);
  });
}

export async function predict(inputData) {
  if (!modelLoaded) {
    return {
      status: "error",
      prediction: null,
      confidence: null,
      message: "Model not loaded.",
    };
  }

  return {
    status: "success",
    prediction: {
      black: 900,
      white: 1100,
    },
    confidence: {
      black: 0.82,
      white: 0.93,
    },
  };
}

// Simulates resetting or unloading the model.
export async function resetModel() {
  modelLoaded = false;
  return { status: "success", message: "Model reset (mock)." };
}