import timm
import torch.nn as nn


class CattleEfficientNet(nn.Module):
    def __init__(self, num_classes=26, pretrained=False):
        super().__init__()

        self.model = timm.create_model(
            "efficientnet_b0",
            pretrained=pretrained,
        )

        if hasattr(self.model, "classifier"):
            self.model.classifier = nn.Linear(
                self.model.classifier.in_features,
                num_classes,
            )

    def load_state_dict(self, state_dict, strict=True):
        """Support checkpoints saved from wrapped or direct EfficientNet modules."""
        if not isinstance(state_dict, dict):
            raise TypeError("state_dict must be a dict")

        adapted_state_dict = {}
        for key, value in state_dict.items():
            normalized_key = key
            if normalized_key.startswith("module."):
                normalized_key = normalized_key[len("module."):]
            elif normalized_key.startswith("model."):
                normalized_key = normalized_key[len("model."):]
            adapted_state_dict[normalized_key] = value

        return self.model.load_state_dict(adapted_state_dict, strict=strict)

    def forward(self, x):
        return self.model(x)