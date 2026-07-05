# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 18_COMPONENT_ARCHITECTURE.md

Version 1.0

---

# PURPOSE

This document defines the complete React component architecture of the ERAYDUŞ Digital Experience Platform.

Every component must be:

Reusable

Composable

Accessible

Responsive

Production-ready

Strongly Typed

Testable

Lazy-loadable where appropriate

The component library should support years of future development without requiring major refactoring.

---

# ARCHITECTURE PHILOSOPHY

Atomic Design

↓

Composition

↓

Feature Based Structure

↓

Reusable Business Components

↓

Application Pages

No page should contain business logic.

Business logic belongs inside hooks, services and server actions.

---

# COMPONENT HIERARCHY

Application

↓

Layouts

↓

Sections

↓

Business Components

↓

UI Components

↓

Primitive Components

---

# FOLDER STRUCTURE

components/

ui/

layout/

navigation/

sections/

homepage/

collections/

products/

configurator/

projects/

gallery/

blog/

faq/

contact/

forms/

dashboard/

admin/

analytics/

seo/

shared/

providers/

---

# UI COMPONENTS

Button

IconButton

Input

Textarea

Checkbox

RadioCard

Dropdown

Select

Combobox

Badge

Avatar

Tooltip

Popover

Tabs

Accordion

Progress

Skeleton

Toast

Modal

Drawer

Carousel

Pagination

Breadcrumb

Divider

Spinner

Chip

Switch

Slider

Table

EmptyState

ErrorState

LoadingState

SearchBar

---

# LAYOUT COMPONENTS

RootLayout

DashboardLayout

AdminLayout

MarketingLayout

BlogLayout

ProductLayout

ConfiguratorLayout

AuthLayout

MinimalLayout

ErrorLayout

---

# NAVIGATION

Navbar

MegaMenu

MobileMenu

Footer

Breadcrumb

Sidebar

QuickActions

SearchDialog

LanguageSwitcher

ThemeSwitcher

---

# HOMEPAGE COMPONENTS

HeroSection

HeroVideo

HeroContent

CollectionShowcase

FeaturedProducts

ConfiguratorPreview

WhyChooseUs

ProjectsShowcase

CustomerReviews

FAQPreview

BlogPreview

CTASection

NewsletterSection

---

# COLLECTION COMPONENTS

CollectionHero

CollectionGrid

CollectionCard

CollectionFilters

CollectionSorting

CollectionComparison

CollectionFAQ

CollectionCTA

---

# PRODUCT COMPONENTS

ProductHero

ProductGallery

ProductViewer360

ProductOverview

ProductSpecifications

ProductFeatures

ProductAccessories

ProductDownloads

ProductReviews

ProductFAQ

RelatedProducts

ProductConfiguratorCTA

StickyPriceCard

---

# CONFIGURATOR COMPONENTS

ConfiguratorWizard

ConfiguratorSidebar

ConfiguratorViewer

ConfigurationSteps

GlassSelector

ProfileSelector

HandleSelector

DoorSelector

MeasurementInput

AccessorySelector

WarrantySelector

InstallationSelector

PriceSummary

ConfigurationSummary

LivePrice

DeliveryEstimator

WhatsAppButton

PDFGenerator

SaveConfiguration

ShareConfiguration

---

# PROJECT COMPONENTS

ProjectHero

ProjectGallery

ProjectInformation

ProjectProducts

ProjectLocation

ProjectTimeline

RelatedProjects

---

# BLOG COMPONENTS

ArticleHero

ArticleContent

TableOfContents

ReadingProgress

AuthorCard

RelatedArticles

ArticleCTA

ShareButtons

NewsletterBox

CommentSection

---

# CONTACT COMPONENTS

ContactForm

GoogleMap

OfficeInformation

WorkingHours

WhatsAppCTA

QuickContactCards

---

# DASHBOARD COMPONENTS

DashboardHeader

StatisticsGrid

RecentQuotes

RecentCustomers

ActivityFeed

SalesChart

TrafficChart

QuickActions

Notifications

---

# ADMIN COMPONENTS

DataTable

FormBuilder

MediaUploader

SEOEditor

RichTextEditor

PermissionMatrix

RoleManager

PriceEngine

ProductManager

CollectionManager

QuoteManager

AnalyticsPanel

AuditLogs

SettingsPanel

---

# SHARED COMPONENTS

PageHeader

SectionTitle

SectionDivider

GlassCard

FeatureCard

ReviewCard

ProjectCard

BlogCard

ImageViewer

VideoPlayer

ComparisonTable

DownloadCard

SocialLinks

FloatingActionButton

---

# PROVIDERS

ThemeProvider

SessionProvider

QueryProvider

ToastProvider

AnalyticsProvider

LanguageProvider

AccessibilityProvider

ModalProvider

---

# CUSTOM HOOKS

useConfigurator

usePricing

useProducts

useCollections

useProjects

useBlog

useSearch

useMedia

useSEO

useWhatsApp

useQuote

useDarkMode

useScrollProgress

useWindowSize

useBreakpoint

useIntersection

useClipboard

useDebounce

useLocalStorage

---

# SERVER ACTIONS

createQuote()

updateQuote()

saveConfiguration()

generatePDF()

generateWhatsAppMessage()

uploadMedia()

publishBlog()

createProduct()

updateSEO()

submitContact()

subscribeNewsletter()

---

# API SERVICES

ProductService

CollectionService

PricingService

QuoteService

BlogService

MediaService

AnalyticsService

SEOService

CustomerService

UserService

---

# STATE MANAGEMENT

Server State

TanStack Query

UI State

React Context

Local State

React Hooks

Persistent State

Local Storage

Authentication

Supabase Auth

---

# VALIDATION

React Hook Form

Zod

Shared validation schemas

Server validation

Client validation

Consistent error messages

---

# ERROR BOUNDARIES

Application

Dashboard

Configurator

Product Page

Blog

Media Upload

Admin Panel

Every major feature should have its own error boundary.

---

# LAZY LOADING

3D Viewer

Gallery

Video Player

Maps

Charts

Analytics

Rich Text Editor

Large Tables

Never block initial rendering.

---

# TESTING

Unit Tests

Component Tests

Integration Tests

Accessibility Tests

Responsive Tests

Performance Tests

Visual Regression Tests

End-to-End Tests

---

# NAMING CONVENTIONS

PascalCase

Components

camelCase

Hooks

camelCase

Functions

kebab-case

Routes

snake_case

Database

SCREAMING_SNAKE_CASE

Constants

---

# REUSABILITY RULES

No duplicated components.

No duplicated layouts.

No duplicated logic.

No duplicated styles.

Create shared utilities whenever repetition appears.

---

# ACCESSIBILITY

ARIA Labels

Keyboard Navigation

Focus Management

Screen Reader Support

Reduced Motion

Semantic HTML

Every component must be accessible.

---

# PERFORMANCE

Memoize expensive components.

Lazy load heavy features.

Optimize rendering.

Avoid unnecessary re-renders.

Use Suspense where appropriate.

Virtualize large lists.

---

# FUTURE MODULES

AI Assistant

AR Viewer

Vision Pro Viewer

Dealer Portal

Architect Workspace

Inventory Dashboard

Production Dashboard

Warehouse

CRM

ERP

Mobile Application

---

# FINAL PRINCIPLE

Every component should be designed as if it could become part of a standalone design system.

The architecture must prioritize scalability, maintainability, consistency and long-term development.

No component should solve only today's problem.

Every component should be ready for tomorrow's platform.