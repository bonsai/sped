"""
Item model for the application.
"""
from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.database import Base


class Item(Base):
    """Item model representing an item in the system."""
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="items")

    def __repr__(self):
        return f"<Item {self.title}>"

    @property
    def owner_email(self) -> str:
        return self.owner.email if self.owner else ""

    @property
    def summary(self) -> str:
        """Return a summary of the item."""
        if not self.description:
            return self.title
        return f"{self.title}: {self.description[:100]}..."
