""
Item related Pydantic models.
"""
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ItemBase(BaseModel):
    """Base model for Item with common fields."""
    title: str = Field(..., min_length=3, max_length=100)
    description: Optional[str] = Field(None, max_length=500)


class ItemCreate(ItemBase):
    """Model for creating a new item."""
    pass


class ItemUpdate(ItemBase):
    """Model for updating an existing item."""
    title: Optional[str] = Field(None, min_length=3, max_length=100)


class ItemInDBBase(ItemBase):
    """Base model for Item in the database."""
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Item(ItemInDBBase):
    """Model for returning an item (without sensitive data)."""
    pass


class ItemInDB(ItemInDBBase):
    """Model for item stored in the database."""
    pass


class ItemSearchResults(BaseModel):
    """Model for search results."""
    results: List[Item]
