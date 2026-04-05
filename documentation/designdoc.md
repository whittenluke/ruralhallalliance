Rural Hall Alliance Website Specification and Build Roadmap

This specification consolidates and replaces the current draft.

1. Project Purpose

Rural Hall Alliance needs a public-facing website that presents the organization as legitimate, organized, and credible. The site should function as the formal home base for the organization by explaining who it is, publishing official communications, providing clear contact paths, and allowing residents or supporters to engage.

The site should feel civic, local, calm, and trustworthy. It should not feel like a campaign landing page, a startup site, or a generic nonprofit template.

2. Primary Goals
Establish legitimacy through a polished, professional public website.
Provide a clear structure for public information and official communications.
Give the admin a non-code way to update published content.
Give the admin a clear way to receive and review private form submissions.
Keep the initial stack lightweight and maintainable.
Avoid a database in version one.
3. Version One Constraints
No database.
No public user accounts.
No custom admin dashboard beyond Decap CMS and Netlify.
No donation system.
No complex event management system.
No stock photography.
No heavy visual effects, large shadows, or startup-style UI patterns.
4. Tech Stack
Framework
Next.js
App Router
TypeScript
Hosting
Netlify
CMS
Decap CMS
GitHub backend for Decap authentication and content commits
Published Content Storage
Repository-based markdown files with frontmatter
Forms
Netlify Forms
Image Storage
Repository-based image assets in a public uploads directory
Database
Not included in version one

Netlify currently supports the major Next.js features through its OpenNext adapter. Decap CMS is a Git-based CMS that stores content in the repository, and its admin interface is typically served from an /admin route. For GitHub repositories, Decap supports a GitHub backend where authenticated users log in with GitHub and need write access to the repo.

Netlify Forms can handle form submissions without a separate backend, and submissions appear in the Netlify dashboard. Netlify’s current docs also note an important implementation detail for newer Next.js runtimes: Netlify Forms requires a static HTML form blueprint for reliable form detection in Next.js Runtime v5. Forms are metered under Netlify’s credit-based pricing, with form submissions consuming credits.

5. Content and Admin Model
Public Website Content

Public content is anything that appears on the website and is intended for visitors to read.

This includes:

Home page content
About page content
Newsroom entries
Calendar entries
Site images uploaded for public display

Public website content will be managed through Decap CMS and stored in the Git repository.

Private Administrative Submissions

Private submissions are anything sent by site visitors through forms and intended only for administrative handling.

This includes:

Media inquiries
Membership applications
General contact messages

Private administrative submissions will be handled through Netlify Forms and reviewed in the Netlify dashboard.

Admin Access Model

The admin will manage:

Published site content in Decap CMS
Form submissions in Netlify

The admin will not edit content directly in code.

6. Site Architecture
Required Routes
/
/about
/newsroom
/newsroom/[slug]
/media
/membership
/contact
/calendar
/admin
Top Navigation
Home
About Us
Newsroom
Membership
Calendar
Contact
Primary Header CTA
Media Inquiries
Footer Navigation
Home
About Us
Newsroom
Membership
Calendar
Contact
Media Inquiries
Footer Utility Content
Organization name
General contact email
Media contact email
Copyright line
7. Page Specifications
Home

Purpose
Introduce the organization, establish credibility, and direct visitors to the most important sections of the site.

Required Sections in Order

Header
Hero
Intro / Mission Summary
Latest Newsroom Items
About Preview
Calendar Preview
Contact / Media Strip
Footer

Hero Requirements

Organization name
One concise positioning statement
Primary button: View Newsroom
Secondary button: Media Inquiries
Local image

Latest Newsroom Items

Show the 3 most recent entries
Each item shows title, date, summary, and link

About Preview

Short description of the organization
Link to About Us

Calendar Preview

Show up to 3 upcoming items
Link to Calendar

Contact / Media Strip

General contact path
Media inquiry path
About Us

Purpose
Explain who the organization is, what it exists to do, and who it represents.

Required Sections

Page heading
Intro paragraph
Mission / purpose
Who the organization serves
Optional short organizational background
Contact reference
Newsroom

Purpose
Create a public archive of official communications.

Required Behavior

Reverse chronological listing
Title
Date
Category
Summary
Link to full entry

Allowed Categories

Press Release
Statement
Community Update
Announcement
Press Release Detail Pages

Purpose
Provide a permanent page for each newsroom entry.

Required Elements

Title
Publish date
Category
Summary
Body content
Optional featured image
Link back to Newsroom
Media Inquiries

Purpose
Provide a direct, professional contact path for reporters.

Required Elements

Page heading
One short explanatory paragraph
Form
Media contact email shown on page
Membership

Purpose
Provide a structured intake path for people interested in joining or participating.

Required Elements

Page heading
Short explanation of membership or involvement
Form
Contact Us

Purpose
Provide a general communication channel for non-media inquiries.

Required Elements

Page heading
Short explanatory paragraph
Form
General contact email shown on page
Calendar

Purpose
Position the site as an active civic resource and display relevant meetings or local events.

Required Behavior

Upcoming items first
Past items may remain visible below upcoming items
Each item shows title, date, time if available, location if available, and optional external link
8. Visual Direction
8.1 Brand Position

The site should look like a legitimate local civic organization: calm, credible, rooted in place, and professionally structured.

The site should feel:

Legitimate
Local
Calm
Trustworthy
Structured
Professional

The site should not feel:

Flashy
Political-campaign styled
Corporate-startup styled
Over-designed
Generic
8.2 Color System
Primary Brand Color
#135543
Secondary Structural Color
#16324F
Primary Background
#F7F4EE
Content Surface
#FFFFFF
Primary Text
#1F2933
Borders / Dividers
#D7E2DD
Alternate Section Background
#EAF1EE
8.3 Color Usage Rules
Green is the primary brand color.
Navy is the structural support color.
The site should remain mostly light and neutral.
Green and navy should not be used in equal proportion.
Buttons and calls to action should favor green.
Navy should be used primarily in header, footer, and select structural elements.
8.4 Typography
Font Pairing
Headings: Newsreader
Body and UI: Inter
Typography Rules
Headings should be formal, clear, and restrained.
Body text should be highly readable.
Newsroom titles should use the heading font.
Navigation, buttons, labels, and form text should use the body font.
Body copy should not exceed a comfortable reading width.
8.5 Layout and Spacing
Layout Rules
Use a clean centered content container.
Standard max content width: 1200px
Standard text max width: 720px
Use a single-column mobile layout and structured desktop layout.
Avoid crowded multi-column compositions.
Spacing Rules
Desktop section spacing: 72px to 96px
Mobile section spacing: 40px to 56px
Internal card and form padding: 24px to 32px
Consistent spacing must be used across all sections
8.6 Buttons and Inputs
Buttons
Border radius: 8px
Primary button: green background, white text
Secondary button: white or off-white background, green border, green text
Hover states should be subtle and restrained
Button text should be short and direct
Inputs
White background
1px border using border color
Clear focus state using green
Comfortable vertical padding
Labels visible above fields
8.7 Cards and Surfaces
Use simple bordered surfaces instead of heavy cards.
Avoid large shadows.
Use white surfaces on the warm off-white page background.
Newsroom items may be displayed as simple cards or bordered list rows.
Forms should sit inside clean white containers.
8.8 Photography Direction
Use real images of Rural Hall, local roads, civic spaces, town character, and recognizable surroundings.
Avoid stock photos.
Avoid generic meeting-room imagery.
Avoid dramatic protest imagery.
Photography should support the identity of the site, not dominate it.
9. Content Model
9.1 Repository Structure
/app
  /(site pages)
  /newsroom/[slug]
  /about
  /media
  /membership
  /contact
  /calendar

/content
  /pages
    home.md
    about.md
    media.md
    membership.md
    contact.md
    calendar-page.md
  /newsroom
    2026-04-01-example-entry.md
  /calendar
    2026-04-15-town-meeting.md
  /settings
    site-settings.md

/public
  /uploads
  /admin
    index.html
    config.yml

Decap’s admin app is commonly served from a static /admin folder, while content remains in the hosted repository and is committed back to the configured branch.

9.2 Decap Collections
Site Settings

Type: file
Purpose: Store site-wide values used across the site

Fields

site_title
site_tagline
general_email
media_email
footer_text
Home Page

Type: file
Purpose: Manage homepage copy and hero content

Fields

hero_title
hero_summary
hero_primary_cta_label
hero_primary_cta_link
hero_secondary_cta_label
hero_secondary_cta_link
hero_image
intro_heading
intro_body
about_preview_heading
about_preview_body
About Page

Type: file
Purpose: Manage About Us page content

Fields

title
summary
mission_heading
mission_body
who_we_serve_heading
who_we_serve_body
body
Newsroom

Type: folder
Purpose: Create repeatable newsroom entries

Fields

title
slug
date
category
summary
featured_image
body
Calendar

Type: folder
Purpose: Create repeatable calendar entries

Fields

title
date
time
location
external_link
summary
10. Form Definitions
10.1 Media Inquiries Form

Purpose
Collect requests from journalists and media outlets.

Fields

full_name
outlet_name
email
phone_number
deadline
topic
message
10.2 Membership Form

Purpose
Collect interest from people who want to join or participate.

Fields

full_name
email
phone_number
relationship_to_community
organization_or_business_name
neighborhood_or_area
message
Relationship to Community Options
Resident
Business Owner
Supporter
Other
10.3 Contact Form

Purpose
Collect general inquiries.

Fields

full_name
email
subject
message
11. Build Rules
Use semantic HTML.
Use accessible heading structure.
Use label elements for all form fields.
Ensure keyboard navigability.
Use responsive layouts from the start.
Do not add animation-heavy behavior.
Do not add decorative sections not defined in this specification.
Do not add extra pages not defined in this specification.
Do not introduce a database.
Do not introduce a custom backend.
Do not introduce a UI library unless required.
Keep the implementation simple and readable.
Prioritize maintainability over abstraction.
12. Build Roadmap
Phase 1: Project Bootstrap
Objectives
Create the Next.js project
Set up TypeScript
Push project to GitHub
Connect project to Netlify
Confirm a working Netlify deployment
Deliverables
Repository created
Netlify site created
Base deployment working
App Router structure in place
Acceptance Criteria
Site deploys successfully on Netlify
Local development environment runs cleanly
Base route loads without errors
Phase 2: Design System and Site Shell
Objectives
Implement the color system
Implement typography
Build the header
Build the footer
Build layout containers and spacing utilities
Deliverables
Global styles
Reusable container
Header component
Footer component
Button styles
Input styles
Acceptance Criteria
Header and footer appear on all public pages
Typography and colors match specification
Layout is mobile-friendly and visually consistent
Phase 3: Static Core Pages
Objectives
Build the route structure
Create the Home, About, Media, Membership, Contact, and Calendar pages
Add placeholder copy and image areas
Build homepage sections in the defined order
Deliverables
All required routes created
Static page templates built
Homepage layout finalized
Acceptance Criteria
Every required route loads
Homepage section order matches specification
Navigation and footer link structure is complete
Phase 4: Newsroom System
Objectives
Build the newsroom listing page
Build the dynamic newsroom detail route
Read newsroom content from markdown files
Display entries in reverse chronological order
Deliverables
Newsroom index page
Newsroom detail page template
Markdown parsing for newsroom content
Acceptance Criteria
Newsroom entries render from repository content
Individual entry pages work by slug
Listing order is reverse chronological
Phase 5: Calendar Content System
Objectives
Build the calendar listing page
Read calendar entries from markdown files
Sort entries by date
Deliverables
Calendar page
Calendar entry data model
Upcoming items displayed first
Acceptance Criteria
Calendar items render from repository content
Dates display correctly
Layout works on mobile and desktop
Phase 6: Forms
Objectives
Build Media Inquiries form
Build Membership form
Build Contact form
Connect all forms to Netlify Forms
Configure submission success states
Deliverables
All three forms implemented
Netlify form handling configured
Success messaging implemented
Critical Implementation Requirement

Netlify Forms must have a static HTML form blueprint for reliable detection in the deployed build when using current Next.js runtime support. Build the static blueprint forms first, then connect the visible form UI to that structure.

Acceptance Criteria
Each form appears in the Netlify dashboard after deployment
Each form submits successfully
Submitted values are captured correctly
Spam protection is enabled if needed
Phase 7: CMS Setup
Objectives
Add Decap CMS
Create /admin
Add index.html and config.yml
Configure GitHub backend
Configure collections
Configure media folder
Test content editing locally and in production
Deliverables
Working /admin route
Functional Decap login
Collections configured
Media uploads working
Content commit flow working
CMS Authentication Model

Use the Decap GitHub backend. The admin will sign in with a GitHub account that has write access to the repository. This avoids relying on Git Gateway as the primary path. Decap’s GitHub backend is a documented first-class option and requires repo write access for normal publishing.

Acceptance Criteria
Admin can log in at /admin
Admin can create a newsroom entry
Admin can edit the About page
Admin can upload an image
Published content changes appear on the live site after deploy
Phase 8: Content Wiring
Objectives
Connect static pages to CMS-managed content where specified
Load site settings from content files
Replace placeholders with actual content model fields
Deliverables
Home page uses content files
About page uses content files
Newsroom uses content files
Calendar uses content files
Shared emails and footer text use site settings
Acceptance Criteria
Public content is no longer hardcoded where CMS management is intended
Site settings populate shared elements correctly
Phase 9: QA and Launch Readiness
Objectives
Test all routes
Test all forms
Test CMS login and content publishing
Test mobile responsiveness
Test images and typography
Test metadata and page titles
Deliverables
Final QA pass
Launch-ready site
Basic admin handoff notes
Acceptance Criteria
No broken routes
No broken form submissions
No visual layout breakage on mobile
No placeholder content remaining in launch areas
Admin can complete the core editing workflow without code changes
13. Admin Workflow
13.1 Published Content Workflow
Admin visits /admin
Admin signs in with authorized GitHub account
Admin selects a collection
Admin creates or edits content
Admin uploads any needed image assets
Admin publishes content
Content is committed to the repository
Netlify rebuilds and republishes the site
13.2 Form Submission Workflow
Visitor submits a form on the public site
Netlify receives the submission
Submission appears in the Netlify dashboard
Admin reviews the submission in Netlify
Notification email is sent if configured

Netlify stores and manages form submissions in its forms system, and submissions can be reviewed from the dashboard.

14. Asset Requirements

The following inputs are required before final launch:

Final logo files
Local photography
Initial homepage copy
Initial About Us copy
Initial newsroom entries
Initial calendar items
General contact email
Media contact email
Domain access
GitHub repository ownership
Netlify site ownership
15. Launch Scope
Included in Version One
Public website
Static and CMS-managed content pages
Newsroom
Calendar
Contact form
Media inquiry form
Membership form
Decap CMS admin
Netlify deployment
Excluded from Version One
Database
Public user accounts
Donations
Search
Complex event management
Member portal
Advanced analytics dashboard
Multi-role editorial workflow
Custom backend
16. Cursor Implementation Order

Cursor should be used in the following order:

Bootstrap the Next.js project and Netlify deployment
Build the global layout system
Build the header and footer
Build the homepage shell
Build the remaining static routes
Build the newsroom system
Build the calendar system
Build and verify Netlify Forms
Add Decap CMS
Connect CMS-managed content
Replace placeholders with actual structured content
Run final QA and cleanup

Each phase should be completed and verified before moving to the next phase.

17. Final Standard

The finished site must feel like a real civic institution website, not a prototype. It must be clean, calm, local, readable, and maintainable. It must support a non-technical admin workflow for published content and a simple administrative workflow for incoming submissions. It must be straightforward to host, straightforward to update, and straightforward to hand off.