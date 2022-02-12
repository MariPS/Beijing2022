import uvicorn
import sys


if __name__ == "__main__":
    uvicorn.run("server.app:app", host="localhost", port=8000, reload=True)