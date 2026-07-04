-- Moiz Website - Supabase Schema Setup

-- 1. Create Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'UI/UX Design', 'Branding & Marketing', 'Web Apps', 'ITSM & Enterprise'
    tech_stack TEXT[] NOT NULL,
    client TEXT,
    role TEXT NOT NULL,
    results TEXT NOT NULL,
    link TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for Portfolio
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on portfolio" 
ON portfolio FOR SELECT USING (true);

-- Allow authenticated user write access (Admin)
CREATE POLICY "Allow authenticated insert on portfolio" ON portfolio FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on portfolio" ON portfolio FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on portfolio" ON portfolio FOR DELETE TO authenticated USING (true);


-- 2. Create Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Struggles', 'Successes', 'Failures', 'Insights'
    status TEXT NOT NULL DEFAULT 'published', -- 'draft', 'published'
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for Blogs
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access on blogs
CREATE POLICY "Allow public read access on blogs" 
ON blogs FOR SELECT USING (status = 'published');

-- Allow authenticated user write access on blogs (Admin)
CREATE POLICY "Allow authenticated insert on blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on blogs" ON blogs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on blogs" ON blogs FOR DELETE TO authenticated USING (true);


-- 3. Create Consulting Services Table
CREATE TABLE IF NOT EXISTS consulting_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL, -- Lucide icon name
    benefits TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE consulting_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on consulting" ON consulting_services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on consulting" ON consulting_services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on consulting" ON consulting_services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on consulting" ON consulting_services FOR DELETE TO authenticated USING (true);


-- 4. Pre-populate initial data (Optional/Default Setup)
INSERT INTO portfolio (title, description, category, tech_stack, client, role, results) VALUES
('TaskTak Business Management Platform (BMP)', 'Designed complete branding, UX, and marketing materials for the US-based BMP platform, establishing a coherent and high-converting visual language.', 'Branding & Marketing', ARRAY['Figma', 'Adobe Illustrator', 'Branding', 'Product Design'], 'TaskTak', 'Lead Branding & Marketing Designer', 'Created modern software UI templates and brand materials that drove the product release in the US and Karachi offices.'),
('Teckflux CMS & Workforce Management Systems', 'Founded and scaled Teckflux, an IT services company, to 50 employees, delivering key enterprise systems including custom CMS, mobile apps, and workforce planning systems.', 'Web Apps', ARRAY['React', 'Node.js', 'PostgreSQL', 'Workforce Management', 'CMS'], 'Multiple US/UK Clients', 'Founder & Director', 'Delivered over 30 projects successfully, scaling operations to a monthly revenue of $80k USD.'),
('Najoom Al Falah Enterprise Store & Online Presence', 'Expanded building materials and MEP supplies catalogs, designed and implemented their online store, and onboarded mega-scale Middle-East clients.', 'ITSM & Enterprise', ARRAY['E-Commerce', 'PHP', 'SEO', 'Aramco Integration', 'Supply Chain Management'], 'Najoom Al Falah Trading Co.', 'Operations & Tech Director', 'Scaled company ARR to 6 Million SAR; onboarded clients like Saudi Aramco, Neom, Red Sea Global, and SWCC.'),
('GASCO ITSM Culture & BMC Helix Upgrade', 'Consulting GASCO (National Gas) to modernise their ITSM culture, resolve complex configuration bugs, and upgrade the BMC Helix ITSM systems to the latest enterprise-stable version.', 'ITSM & Enterprise', ARRAY['BMC Helix', 'ITSM', 'ITIL', 'Enterprise Strategy'], 'GASCO (Saudi Arabia)', 'Principal ITSM Consultant', 'Stabilized crucial gas-distribution ticketing workflows, upgraded version stacks, and trained 100+ team members.');

INSERT INTO blogs (title, excerpt, content, category) VALUES
('The Rollercoaster of Scaling Teckflux to $80k MRR', 'My journey of founding an IT services startup in Karachi, scaling it to a 50-person team, and the critical business lessons learned when closing it.', 'Founding Teckflux was one of the most exhilarating experiences of my career. It started in a tiny office and grew into a powerhouse of 50 designers, developers, and project managers. We worked with brands like Nike and Crowdwrks, building apps, CMS engines, and enterprise solutions. Our target market was the US and UK. At our peak, we hit $80,000 monthly recurring revenue. But rapid scaling brings unexpected operational hurdles, cash flow pressures, and management complexities. Due to unforeseen market shifts and challenges, we had to make the difficult decision to close it down. That failure taught me more about business operations, financial buffer management, and team alignment than any success ever could.', 'Struggles'),
('Scaling Operations from Riyadh: The Najoom Al Falah Story', 'How I transformed a local electrical trading company into a 6 Million SAR ARR supplier for Saudi Aramco, Neom, and Red Sea Global.', 'When I joined Najoom Al Falah Trading Co. in Riyadh, the operations were modest, focused purely on electrical materials. I saw an enormous opportunity to expand our offerings into MEP, Furniture, Mechanical, Gym Equipment, and building materials. In addition to expanding the supply chain, I focused heavily on establishing an exceptional online presence, launching their e-commerce store, and targeting enterprise clients. By modernizing our operations and building credibility, we successfully onboarded tier-1 Saudi clients, including Saudi Aramco, Red Sea Global, Neom, and SWCC. This strategy scaled our annual recurring revenue to 6 Million SAR.', 'Successes'),
('Rebuilding ITSM Culture: Tackling BMC Helix Upgrades at GASCO', 'Reflections on fixing critical enterprise software bugs, driving digital transformation, and shifting mindset inside a major national utility provider.', 'Enterprises often buy complex systems like BMC Helix ITSM but struggle with user adoption and system stability. My ongoing consulting role at GASCO involves exactly this: auditing a system plagued by performance issues and configuration bugs, upgrading it to the latest secure version, and most importantly, driving a cultural shift towards ITIL best practices. Digital transformation is 20% technology and 80% people. By focusing on training, workflow stabilization, and developer enablement, we are successfully stabilizing GASCO''s service desk.', 'Insights');

INSERT INTO consulting_services (title, description, icon, benefits) VALUES
('Business & Scale Strategy', 'Consulting on operational scaling, agency growth, and building high-performance tech teams based on years of managing 50+ staff and 6M SAR supply operations.', 'TrendingUp', ARRAY['Team structuring and hiring blueprints', 'Service agency sales and lead gen strategy', 'Supply chain and client onboarding optimization']),
('ITSM Consulting (BMC Helix)', 'Specialized enterprise consulting for BMC Helix ITSM systems, workflow stabilization, upgrades, and ITIL culture enablement.', 'Settings', ARRAY['System architecture audit and bug fixing', 'ITIL aligned culture development', 'BMC Helix upgrade roadmap & deployment support']),
('Brand & Product UX Design', 'Premium user experience design, wireframing, e-commerce stores, and cohesive branding blueprints that connect with global markets.', 'Framer', ARRAY['High-converting UX wireframes and mockups', 'Comprehensive brand books and guidelines', 'E-commerce platform optimization (Shopify, Custom)']);


-- 5. Create Profile Settings Table
CREATE TABLE IF NOT EXISTS profile_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- Enable RLS
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on settings" ON profile_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on settings" ON profile_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on settings" ON profile_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on settings" ON profile_settings FOR DELETE TO authenticated USING (true);

-- Seed settings
INSERT INTO profile_settings (key, value) VALUES
('nav_links', '[
  {"label": "Home", "path": "/"},
  {"label": "About", "path": "/about"},
  {"label": "Portfolio", "path": "/portfolio"},
  {"label": "Labs", "path": "/#labs-section"},
  {"label": "Newsletter", "path": "/#newsletter-section"}
]'::jsonb),
('consultation_label', '"Book a Consultation"'::jsonb),
('consultation_path', '"#newsletter-section"'::jsonb),
('hero_image_url', '"/src/assets/hero.png"'::jsonb),
('hero_headline', '"Building the Future of Digital Systems."'::jsonb),
('hero_subheadline', '"Entrepreneur, Designer, and Systems Architect."'::jsonb),
('hero_button_label', '"Book a call"'::jsonb),
('hero_button_path', '"#newsletter-section"'::jsonb),
('stats', '[
  {"id": "01", "value": "8+", "label": "Years Experience", "subtext": "In enterprise operations"},
  {"id": "02", "value": "50+", "label": "Team Members", "subtext": "Managed at Teckflux"},
  {"id": "03", "value": "6M SAR", "label": "ARR Scaled", "subtext": "At Najoom Al Falah"},
  {"id": "04", "value": "100%", "label": "SLA Met", "subtext": "For GASCO Helix ITSM"}
]'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

