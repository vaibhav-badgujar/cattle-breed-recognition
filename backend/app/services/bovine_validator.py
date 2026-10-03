"""
Bovine image validation service.

Uses YOLO-World as a pre-classification gate to determine whether
an uploaded image contains cattle or buffalo.
"""

from pathlib import Path
from threading import Lock

from PIL import Image

from backend.app.core.logging import logger


class BovineValidator:
    """Validate whether an image contains cattle or buffalo."""

    CLASSES = [
        "cattle",
        "cow",
        "buffalo",
        "water buffalo",
    ]

    def __init__(
        self,
        model_path: str = "yolov8s-world.pt",
        confidence_threshold: float = 0.25,
    ):
        self.model_path = model_path
        self.confidence_threshold = confidence_threshold
        self.model = None
        self.is_loaded = False
        self._lock = Lock()

    def load(self):
        """Load the YOLO-World model."""
        try:
            from ultralytics import YOLO

            logger.info(
                f"Loading bovine validator model: {self.model_path}"
            )

            self.model = YOLO(self.model_path)

            # Configure the detector to look for bovine-related classes.
            self.model.set_classes(self.CLASSES)

            self.is_loaded = True

            logger.info(
                f"Bovine validator loaded successfully. "
                f"Classes: {self.CLASSES}"
            )

        except Exception as e:
            self.is_loaded = False
            logger.error(f"Failed to load bovine validator: {e}")
            raise

    def validate(self, image: Image.Image) -> dict:
        """
        Check whether the image contains cattle or buffalo.

        Returns:
            {
                "is_bovine": bool,
                "confidence": float,
                "detected_class": str | None
            }
        """

        if not self.is_loaded or self.model is None:
            raise RuntimeError("Bovine validator is not loaded")

        try:
            with self._lock:
                results = self.model.predict(
                    source=image,
                    conf=self.confidence_threshold,
                    verbose=False,
                )

            if not results:
                return {
                    "is_bovine": False,
                    "confidence": 0.0,
                    "detected_class": None,
                }

            result = results[0]

            if result.boxes is None or len(result.boxes) == 0:
                return {
                    "is_bovine": False,
                    "confidence": 0.0,
                    "detected_class": None,
                }

            best_confidence = 0.0
            best_class = None

            for box in result.boxes:
                confidence = float(box.conf[0].item())
                class_id = int(box.cls[0].item())

                if confidence > best_confidence:
                    best_confidence = confidence

                    if class_id < len(self.CLASSES):
                        best_class = self.CLASSES[class_id]

            return {
                "is_bovine": best_class is not None,
                "confidence": round(best_confidence, 4),
                "detected_class": best_class,
            }

        except Exception as e:
            logger.error(f"Bovine validation failed: {e}")
            raise


bovine_validator = BovineValidator()