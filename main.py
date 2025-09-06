
import os
import sys
from pathlib import Path

# Add the project root to the Python path
project_root = str(Path(__file__).parent.absolute())
if project_root not in sys.path:
    sys.path.insert(0, project_root)

import uvicorn
from fastapi import FastAPI

try:
    from app import create_app
    app = create_app()
except ImportError as e:
    print(f"Error importing app: {e}")
    print(f"Current Python path: {sys.path}")
    raise

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, reload_dirs=["app"])
