"use client";

import Rainbow from "@/components/mandalas/rainbow";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebaseClient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Mandala() {
  const svgRef = useRef(null);
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState("#D25BC8");
  const [downloadURL, setDownloadURL] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const mandalas = [
    {
      title: "rainbow",
      description:
        "This mandala is inspired by a rainbow, a natural phenomenon that occurs after a storm.",
      component: Rainbow,
    },
  ];

  const mandala = mandalas.find((mandala) => mandala.title === params.mandala);

  if (!mandala) {
    return <h1>Not found</h1>;
  }

  // Function to convert SVG to canvas
  const convertSvgToCanvas = (svg: SVGSVGElement) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      img.src = "data:image/svg+xml," + encodeURIComponent(svgData);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
        resolve(canvas);
      };
      img.onerror = (error) => reject(error);
    });
  };

  // Function to convert canvas to image and upload it to Firebase Storage
  const canvasToImageAndUpload = (canvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: any) => {
        // Create a reference to 'mandalas/mandala.png'
        const storageRef = ref(
          storage,
          `mandalas/${mandala.title}/${Date.now()}.png`
        );

        // Upload the file
        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            // Get the download URL
            getDownloadURL(snapshot.ref)
              .then((downloadURL) => {
                setDownloadURL(downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  // Function to handle export and upload
  const exportAndUpload = async () => {
    if (svgRef.current) {
      try {
        const canvas = await convertSvgToCanvas(svgRef.current);
        await canvasToImageAndUpload(canvas as HTMLCanvasElement);
        setIsCreated(true);
        setLoading(true);
      } catch (error) {}
    }
  };

  async function analyzeImage(imageUrl: string) {
    const response = await fetch("/api/analyzeMandala", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze image");
    }

    const data = await response.json();
    console.log(data);
    return data.text;
  }

  useEffect(() => {
    if (!isCreated) {
      return;
    }

    analyzeImage(downloadURL)
      .then((data) => setAnalysis(data))
      .finally(() => setLoading(false));
  }, [isCreated, downloadURL]);

  return (
    <>
      {!analysis && !loading ? (
        <div className="h-[50rem] w-full bg-black  flex-col bg-dot-white/[0.2]  relative flex items-center justify-center text-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            {mandala.title.charAt(0).toUpperCase() + mandala.title.slice(1)}
          </p>
          <div className="absolute top-4 right-4">
            <div className="flex justify-center items-center w-full gap-4">
              <label htmlFor="color" className="text-white">
                Select color
              </label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <mandala.component
              filledColor={selectedColor}
              className="w-full h-auto sm:w-64 sm:h-64 md:w-96 md:h-96 cursor-pointer"
              svgRef={svgRef}
            />
          </div>

          <button
            className="my-4 bg-gradient-to-b from-neutral-200 to-neutral-500 py-2 px-4 rounded-lg"
            onClick={exportAndUpload}
          >
            Interpret Mandala
          </button>

          <p className="text-2xl sm:text-2xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            {mandala.description}
          </p>
        </div>
      ) : loading && !analysis ? (
        <div className="h-[50rem] w-full bg-black flex-col bg-dot-white/[0.2] relative flex items-center justify-center text-center">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Analyzing Mandala
          </p>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-200"></div>
        </div>
      ) : (
        <div className="h-[50rem] w-full bg-black flex-col bg-dot-white/[0.2] relative flex items-center justify-center text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mx-auto p-4">
            {/* Minimalist card for the text */}
            {analysis && (
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-4 flex items-center justify-center">
                <p className="text-sm md:text-sm font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                  <TextGenerateEffect words={analysis} />
                </p>
              </div>
            )}

            {/* Minimalist card for the image */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden flex justify-center items-center">
              <img
                className="w-full h-auto sm:w-64 sm:h-64 md:w-96 md:h-96 cursor-pointer"
                src={downloadURL}
                alt="Created Mandala"
              />
            </div>
            <div className="flex justify-center items-center w-full md:col-span-2 mt-4 gap-8">
              <a href={downloadURL} download>
                <button className="bg-gradient-to-b from-neutral-200 to-neutral-500 py-2 px-4 rounded-lg">
                  Download Mandala
                </button>
              </a>
              <button
                className="bg-gradient-to-b from-neutral-200 to-neutral-500 py-2 px-4 rounded-lg"
                onClick={() => setAnalysis(null)}
              >
                Create another
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
