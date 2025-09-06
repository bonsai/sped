"""
CRUD operations for Item model.
"""
from typing import Any, Dict, List, Optional, Union, no_type_check
from datetime import datetime
from sqlalchemy.orm import Session
from app import models, schemas
from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase

class CRUDItem(CRUDBase[models.Item, schemas.ItemCreate, schemas.ItemUpdate]):
    """CRUD operations for Item model."""
    
    def create_with_owner(
        self, db: Session, *, obj_in: schemas.ItemCreate, owner_id: int
    ) -> models.Item:
        """Create a new item with an owner."""
        db_obj = models.Item(
            title=obj_in.title,
            description=obj_in.description,
            owner_id=owner_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[models.Item]:
        """Get multiple items by owner."""
        return (
            db.query(self.model)
            .filter(models.Item.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


# Create an instance of CRUDItem
item = CRUDItem(models.Item)
