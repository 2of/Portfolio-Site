// mlModel.js

let modelLoaded = false;


export async function loadModel({ modelType = "undefined", shouldFail = true }) {

  // just weird lazt for now ... 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject({ status: "error", message: `Failed to load model: ${modelType}` });
      } else {
        const modelLoaded = true;
        resolve({ status: "success", message: `Model: ${modelType} Loaded` });
      }
    }, 1000);
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