import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial Mock Data
const initialBlogs = [
  {
    id: 'b1',
    title: 'The Rollercoaster of Scaling Teckflux to $80k MRR',
    excerpt: 'My journey of founding an IT services startup in Karachi, scaling it to a 50-person team, and the critical business lessons learned when closing it.',
    content: `Founding Teckflux was one of the most exhilarating experiences of my career. It started in a tiny office and grew into a powerhouse of 50 designers, developers, and project managers. We worked with brands like Nike and Crowdwrks, building apps, CMS engines, and enterprise solutions. Our target market was the US and UK. 

At our peak, we hit $80,000 monthly recurring revenue. But rapid scaling brings unexpected operational hurdles, cash flow pressures, and management complexities. Due to unforeseen market shifts and challenges, we had to make the difficult decision to close it down. 

That failure taught me more about business operations, financial buffer management, and team alignment than any success ever could. In this post, I want to share the key lessons:
1. **Focus on Cash Flow over Revenue:** Having $80k MRR is great, but managing accounts receivable is critical.
2. **Standardize Operations Early:** Scaling a service agency requires strict process documentation.
3. **Align Team Incentives:** Empowering project managers is the key to decoupling founder time from project delivery.`,
    category: 'Struggles',
    status: 'published',
    created_at: new Date('2025-06-15').toISOString(),
    image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'b2',
    title: 'Scaling Operations from Scratch in Riyadh: The Najoom Al Falah Story',
    excerpt: 'How I transformed a local electrical trading company into a 6 Million SAR ARR supplier for Saudi Aramco, Neom, and Red Sea Global.',
    content: `When I joined Najoom Al Falah Trading Co. in Riyadh, the operations were modest, focused purely on electrical materials. I saw an enormous opportunity to expand our offerings into MEP, Furniture, Mechanical, Gym Equipment, and building materials. 

In addition to expanding the supply chain, I focused heavily on establishing an exceptional online presence, launching their e-commerce store, and targeting enterprise clients. 

By modernizing our operations and building credibility, we successfully onboarded tier-1 Saudi clients, including:
- **Saudi Aramco**
- **Red Sea Global**
- **Neom**
- **SWCC**
- **Al Khorayef Group**

This strategy scaled our annual recurring revenue to 6 Million SAR and positioned us as a multi-discipline supplier rather than just a regional electrical shop. Key takeaways:
- **Supplier Onboarding is Key:** If you don't have the material, make sure you have the best manufacturer on speed dial.
- **Enterprise Trust is Earned:** Compliance, strict documentation, and rapid bidding are mandatory for government and Aramco contracts.
- **Go Digital First:** B2B buyers in Saudi Arabia are increasingly looking for transparent, professional digital catalogs.`,
    category: 'Successes',
    status: 'published',
    created_at: new Date('2025-12-10').toISOString(),
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'b3',
    title: 'Rebuilding ITSM Culture: Tackling BMC Helix Upgrades at GASCO',
    excerpt: 'Reflections on fixing critical enterprise software bugs, driving digital transformation, and shifting mindset inside a major national utility provider.',
    content: `Enterprises often buy complex systems like BMC Helix ITSM but struggle with user adoption and system stability. My ongoing consulting role at GASCO involves exactly this: auditing a system plagued by performance issues and configuration bugs, upgrading it to the latest secure version, and most importantly, driving a cultural shift towards ITIL best practices.

Digital transformation is 20% technology and 80% people. By focusing on training, workflow stabilization, and developer enablement, we are successfully stabilizing GASCO's service desk.

In large enterprise systems, you must tackle:
1. **Tech Debt Cleanup:** Documenting and removing undocumented customizations that break standard API endpoints.
2. **ITSM Training:** Aligning support tiers so incidents are correctly categorized, resulting in 40% faster resolution.
3. **Helix Upgrades:** Executing structured database schema updates and verifying customizations are fully backwards compatible.`,
    category: 'Insights',
    status: 'published',
    created_at: new Date('2026-05-20').toISOString(),
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60'
  }
];

const initialPortfolio = [
  {
    id: 'p1',
    title: 'TaskTak Business Management Platform (BMP)',
    description: 'Designed complete branding, UX, and marketing materials for the US-based BMP platform, establishing a coherent and high-converting visual language.',
    category: 'Branding & Marketing',
    tech_stack: ['Figma', 'Adobe Illustrator', 'Branding', 'Product Design'],
    client: 'TaskTak',
    role: 'Lead Branding & Marketing Designer',
    results: 'Created modern software UI templates and brand materials that drove the product release in the US and Karachi offices.',
    link: 'https://tasktak.com',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'p2',
    title: 'Teckflux CMS & Workforce Management Systems',
    description: 'Founded and scaled Teckflux, an IT services company, to 50 employees, delivering key enterprise systems including custom CMS, mobile apps, and workforce planning systems.',
    category: 'Web Apps',
    tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Workforce Management', 'CMS'],
    client: 'Multiple US/UK Clients',
    role: 'Founder & Director',
    results: 'Delivered over 30 projects successfully, scaling operations to a monthly revenue of $80k USD.',
    link: '',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'p3',
    title: 'Najoom Al Falah Enterprise Store & Online Presence',
    description: 'Expanded building materials and MEP supplies catalogs, designed and implemented their online store, and onboarded mega-scale Middle-East clients.',
    category: 'ITSM & Enterprise',
    tech_stack: ['E-Commerce', 'PHP', 'SEO', 'Aramco Integration', 'Supply Chain Management'],
    client: 'Najoom Al Falah Trading Co.',
    role: 'Operations & Tech Director',
    results: 'Scaled company ARR to 6 Million SAR; onboarded clients like Saudi Aramco, Neom, Red Sea Global, and SWCC.',
    link: 'https://najoomalfalah.com',
    image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'p4',
    title: 'GASCO ITSM Culture & BMC Helix Upgrade',
    description: 'Consulting GASCO (National Gas) to modernise their ITSM culture, resolve complex configuration bugs, and upgrade the BMC Helix ITSM systems to the latest enterprise-stable version.',
    category: 'ITSM & Enterprise',
    tech_stack: ['BMC Helix', 'ITSM', 'ITIL', 'Enterprise Strategy'],
    client: 'GASCO (Saudi Arabia)',
    role: 'Principal ITSM Consultant',
    results: 'Stabilized crucial gas-distribution ticketing workflows, upgraded version stacks, and trained 100+ team members.',
    link: '',
    image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60'
  }
];

const initialConsulting = [
  {
    id: 'c1',
    title: 'Business & Scale Strategy',
    description: 'Consulting on operational scaling, agency growth, and building high-performance tech teams based on years of managing 50+ staff and 6M SAR supply operations.',
    icon: 'TrendingUp',
    benefits: [
      'Team structuring and hiring blueprints',
      'Service agency sales and lead gen strategy',
      'Supply chain and client onboarding optimization'
    ]
  },
  {
    id: 'c2',
    title: 'ITSM Consulting (BMC Helix)',
    description: 'Specialized enterprise consulting for BMC Helix ITSM systems, workflow stabilization, upgrades, and ITIL culture enablement.',
    icon: 'Settings',
    benefits: [
      'System architecture audit and bug fixing',
      'ITIL aligned culture development',
      'BMC Helix upgrade roadmap & deployment support'
    ]
  },
  {
    id: 'c3',
    title: 'Brand & Product UX Design',
    description: 'Premium user experience design, wireframing, e-commerce stores, and cohesive branding blueprints that connect with global markets.',
    icon: 'Palette',
    benefits: [
      'High-converting UX wireframes and mockups',
      'Comprehensive brand books and guidelines',
      'E-commerce platform optimization (Shopify, Custom)'
    ]
  }
];

const defaultSettings = {
  nav_links: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Labs', path: '/#labs-section' },
    { label: 'Newsletter', path: '/#newsletter-section' }
  ],
  consultation_label: 'Book a Consultation',
  consultation_path: '#newsletter-section',
  hero_image_url: '/src/assets/hero.png',
  hero_headline: 'Building the Future of Digital Systems.',
  hero_subheadline: 'Entrepreneur, Designer, and Systems Architect.',
  hero_button_label: 'Book a call',
  hero_button_path: '#newsletter-section',
  hero_badge_text: '« Entrepreneur building systems »',
  partners_title: 'My Trusted Partners',
  profile_name: 'Moiz Riaz',
  profile_title: 'ITSM Principal Consultant',
  profile_badge: 'Systems Architect',
  profile_link_text: 'moizriaz.net',
  profile_link_path: 'mailto:contact@moizriaz.net',
  profile_phone: '+966500000000',
  profile_email: 'contact@moizriaz.net',
  analytics_title: 'Analytics Growth',
  animations_enabled: true,
  animation_duration_ms: 800,
  maintenance_mode: true,
  stats: [
    { id: '01', value: '8+', label: 'Years Experience', subtext: 'In enterprise operations' },
    { id: '02', value: '50+', label: 'Team Members', subtext: 'Managed at Teckflux' },
    { id: '03', value: '6M SAR', label: 'ARR Scaled', subtext: 'At Najoom Al Falah' },
    { id: '04', value: '100%', label: 'SLA Met', subtext: 'For GASCO Helix ITSM' }
  ]
};

// Local Storage Helper
const getLocal = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(data);
};

const setLocal = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

// Simulated Delay for local queries
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  // --- SETTINGS ---
  async getSettings() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('*');
      if (error) throw error;
      const settings = {};
      data.forEach(row => {
        settings[row.key] = row.value;
      });
      return { ...defaultSettings, ...settings };
    } else {
      await delay();
      return getLocal('moiz_settings', defaultSettings);
    }
  },

  async saveSettings(settings) {
    if (isSupabaseConfigured) {
      const upserts = Object.keys(settings).map(key => ({
        key,
        value: settings[key]
      }));
      const { error } = await supabase
        .from('profile_settings')
        .upsert(upserts);
      if (error) throw error;
      return settings;
    } else {
      await delay();
      setLocal('moiz_settings', settings);
      return settings;
    }
  },

  // --- BLOGS ---
  async getBlogs() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      await delay();
      return getLocal('moiz_blogs', initialBlogs).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },

  async getBlog(id) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    } else {
      await delay();
      const list = getLocal('moiz_blogs', initialBlogs);
      return list.find(b => b.id === id) || null;
    }
  },

  async saveBlog(blog) {
    if (isSupabaseConfigured) {
      const isNew = !blog.id;
      if (isNew) {
        const { data, error } = await supabase.from('blogs').insert([blog]).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from('blogs').update(blog).eq('id', blog.id).select().single();
        if (error) throw error;
        return data;
      }
    } else {
      await delay();
      const list = getLocal('moiz_blogs', initialBlogs);
      if (!blog.id) {
        const newBlog = {
          ...blog,
          id: 'b_' + Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString()
        };
        list.push(newBlog);
        setLocal('moiz_blogs', list);
        return newBlog;
      } else {
        const idx = list.findIndex(b => b.id === blog.id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...blog };
          setLocal('moiz_blogs', list);
          return list[idx];
        }
        throw new Error('Blog post not found');
      }
    }
  },

  async deleteBlog(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      return true;
    } else {
      await delay();
      let list = getLocal('moiz_blogs', initialBlogs);
      list = list.filter(b => b.id !== id);
      setLocal('moiz_blogs', list);
      return true;
    }
  },

  // --- PORTFOLIO ---
  async getPortfolio() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      await delay();
      return getLocal('moiz_portfolio', initialPortfolio);
    }
  },

  async savePortfolioItem(project) {
    if (isSupabaseConfigured) {
      if (!project.id) {
        const { data, error } = await supabase.from('portfolio').insert([project]).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from('portfolio').update(project).eq('id', project.id).select().single();
        if (error) throw error;
        return data;
      }
    } else {
      await delay();
      const list = getLocal('moiz_portfolio', initialPortfolio);
      if (!project.id) {
        const newProj = {
          ...project,
          id: 'p_' + Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString()
        };
        list.push(newProj);
        setLocal('moiz_portfolio', list);
        return newProj;
      } else {
        const idx = list.findIndex(p => p.id === project.id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...project };
          setLocal('moiz_portfolio', list);
          return list[idx];
        }
        throw new Error('Portfolio item not found');
      }
    }
  },

  async deletePortfolioItem(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw error;
      return true;
    } else {
      await delay();
      let list = getLocal('moiz_portfolio', initialPortfolio);
      list = list.filter(p => p.id !== id);
      setLocal('moiz_portfolio', list);
      return true;
    }
  },

  // --- CONSULTING ---
  async getConsultingServices() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('consulting_services').select('*');
      if (error) throw error;
      return data;
    } else {
      await delay();
      return getLocal('moiz_consulting', initialConsulting);
    }
  },

  async saveConsultingService(service) {
    if (isSupabaseConfigured) {
      if (!service.id) {
        const { data, error } = await supabase.from('consulting_services').insert([service]).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from('consulting_services').update(service).eq('id', service.id).select().single();
        if (error) throw error;
        return data;
      }
    } else {
      await delay();
      const list = getLocal('moiz_consulting', initialConsulting);
      if (!service.id) {
        const newService = {
          ...service,
          id: 'c_' + Math.random().toString(36).substr(2, 9)
        };
        list.push(newService);
        setLocal('moiz_consulting', list);
        return newService;
      } else {
        const idx = list.findIndex(s => s.id === service.id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...service };
          setLocal('moiz_consulting', list);
          return list[idx];
        }
        throw new Error('Service not found');
      }
    }
  },

  // --- MOCK AUTH ---
  async login(email, password) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user;
    } else {
      await delay();
      if (email === 'admin@moiz.com' && password === 'admin') {
        const mockUser = { email, id: 'admin_mock', role: 'admin' };
        localStorage.setItem('moiz_admin_user', JSON.stringify(mockUser));
        return mockUser;
      }
      throw new Error('Invalid email or password. Use admin@moiz.com / admin in Mock Mode.');
    }
  },

  async logout() {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } else {
      localStorage.removeItem('moiz_admin_user');
    }
    return true;
  },

  async getCurrentUser() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } else {
      const user = localStorage.getItem('moiz_admin_user');
      return user ? JSON.parse(user) : null;
    }
  }
};
