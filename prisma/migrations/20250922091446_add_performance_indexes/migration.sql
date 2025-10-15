-- Performance indexes for production database
-- Run this migration to optimize query performance

-- User queries
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_role ON "User"(role);
CREATE INDEX IF NOT EXISTS idx_user_last_login ON "User"("lastLogin");

-- Listing queries (most frequently accessed)
CREATE INDEX IF NOT EXISTS idx_listing_published ON "Listing"("isPublished");
CREATE INDEX IF NOT EXISTS idx_listing_host ON "Listing"("hostId");
CREATE INDEX IF NOT EXISTS idx_listing_location ON "Listing"("locationId");
CREATE INDEX IF NOT EXISTS idx_listing_price ON "Listing"("pricePerNight");
CREATE INDEX IF NOT EXISTS idx_listing_created ON "Listing"("postedDate");
CREATE INDEX IF NOT EXISTS idx_listing_property_type ON "Listing"("propertyType");
CREATE INDEX IF NOT EXISTS idx_listing_guest_count ON "Listing"("guestCount");
CREATE INDEX IF NOT EXISTS idx_listing_draft ON "Listing"("draft");

-- Composite index for search queries
CREATE INDEX IF NOT EXISTS idx_listing_search ON "Listing"("isPublished", "pricePerNight", "guestCount");
CREATE INDEX IF NOT EXISTS idx_listing_filter ON "Listing"("isPublished", "draft", "propertyType", "bedrooms", "bathrooms");

-- Location queries for geo-search
CREATE INDEX IF NOT EXISTS idx_location_city_state ON "Location"(city, state);
CREATE INDEX IF NOT EXISTS idx_location_coordinates ON "Location"(latitude, longitude);

-- Application queries
CREATE INDEX IF NOT EXISTS idx_application_property ON "Application"("propertyId");
CREATE INDEX IF NOT EXISTS idx_application_tenant ON "Application"("tenantId");
CREATE INDEX IF NOT EXISTS idx_application_status ON "Application"(status);
CREATE INDEX IF NOT EXISTS idx_application_date ON "Application"("applicationDate");

-- Lease queries
CREATE INDEX IF NOT EXISTS idx_lease_property ON "Lease"("propertyId");
CREATE INDEX IF NOT EXISTS idx_lease_tenant ON "Lease"("tenantId");
CREATE INDEX IF NOT EXISTS idx_lease_dates ON "Lease"("startDate", "endDate");

-- Payment queries
CREATE INDEX IF NOT EXISTS idx_payment_lease ON "Payment"("leaseId");
CREATE INDEX IF NOT EXISTS idx_payment_status ON "Payment"("paymentStatus");
CREATE INDEX IF NOT EXISTS idx_payment_due_date ON "Payment"("dueDate");

-- Tenant queries
CREATE INDEX IF NOT EXISTS idx_tenant_user ON "Tenant"("userId");
CREATE INDEX IF NOT EXISTS idx_tenant_email ON "Tenant"(email);

-- Tenant favorites (many-to-many)
-- This index is for the junction table
CREATE INDEX IF NOT EXISTS idx_tenant_favorites ON "_TenantFavorites"("A", "B");

-- Tenant properties (many-to-many)
CREATE INDEX IF NOT EXISTS idx_tenant_properties ON "_TenantProperties"("A", "B");

-- Session management
CREATE INDEX IF NOT EXISTS idx_session_token ON "Session"("sessionToken");
CREATE INDEX IF NOT EXISTS idx_session_user ON "Session"("userId");
CREATE INDEX IF NOT EXISTS idx_session_expires ON "Session"(expires);

-- Account queries
CREATE INDEX IF NOT EXISTS idx_account_user ON "Account"("userId");

-- Token queries for authentication
CREATE INDEX IF NOT EXISTS idx_verification_token ON "VerificationToken"(token);
CREATE INDEX IF NOT EXISTS idx_verification_email ON "VerificationToken"(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_token ON "PasswordResetToken"(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_email ON "PasswordResetToken"(email);
CREATE INDEX IF NOT EXISTS idx_two_factor_token ON "TwoFactorToken"(token);
CREATE INDEX IF NOT EXISTS idx_two_factor_email ON "TwoFactorToken"(email);

-- Full-text search on listings (PostgreSQL specific)
-- This enables fast text search on title and description
CREATE INDEX IF NOT EXISTS idx_listing_fulltext ON "Listing" USING GIN (
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, ''))
);