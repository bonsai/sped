"""
Main API router that includes all versioned API endpoints.
"""
from fastapi import APIRouter

# Import all routers here
from app.api.v1.endpoints import auth, users, items

api_router = APIRouter()

# Include all API endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(items.router, prefix="/items", tags=["Items"])
