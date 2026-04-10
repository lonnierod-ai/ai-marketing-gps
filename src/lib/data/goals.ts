import { MarketingGoal } from "@/types";

/**
 * Marketing Goals Database
 * Curated based on use cases from the AI Toolkit
 * Each goal maps to specific tools that help achieve it
 * Updated: Added 10 new goals covering Headshots, Ad Creatives, LinkedIn,
 * YouTube, Email Newsletters, SEO Blog Writing, Social Scheduling,
 * AIO Optimization, Content Repurposing Automation, and Image Editing
 */

export const MARKETING_GOALS: MarketingGoal[] = [
  // ========================================
  // CONTENT MARKETING GOALS
  // ========================================
  {
    id: "create-blog-content",
    title: "Create Blog Content Faster",
    description:
      "Speed up blog post creation from research to publication. Use AI to brainstorm topics, create outlines, draft content, and optimize for SEO.",
    category: "content-marketing",
    tags: [
      "blog",
      "writing",
      "content",
      "seo",
      "articles",
      "posts",
      "faster",
      "speed",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "1-2 days per post",
    recommendedTools: [
      "chatgpt",
      "claude",
      "notebooklm",
      "surfer-seo",
      "grammarly",
      "copy-ai",
      "gemini-3",
    ],
    workflow: {
      description:
        "Complete blog workflow from research to SEO-optimized publication",
      steps: [
        "Research topic and gather sources with NotebookLM (upload competitor articles, industry reports)",
        "Generate multiple content angles with ChatGPT or Claude",
        "Create detailed outline with Claude (maintains consistency)",
        "Draft full content with ChatGPT (fast first drafts)",
        "Optimize for SEO with Surfer SEO (keyword recommendations)",
        "Polish and refine with Grammarly (grammar, tone, clarity)",
      ],
    },
    examplePrompts: [
      "Write a 1500-word blog post about [topic] for SMB content marketers. Include practical examples and actionable tips.",
      "Create 5 different angles for a blog post about [topic]. For each angle, provide a headline and 3 key points.",
      "Generate an SEO-optimized outline for a blog post targeting the keyword '[keyword]'. Include H2 and H3 headings.",
    ],
  },
  {
    id: "seo-optimization",
    title: "Improve SEO Rankings",
    description:
      "Optimize content for search engines and AI-powered search. Research keywords, analyze competitors, and create comprehensive, well-structured content that ranks.",
    category: "seo-research",
    tags: [
      "seo",
      "optimization",
      "rankings",
      "keywords",
      "search",
      "google",
      "traffic",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Ongoing",
    recommendedTools: [
      "surfer-seo",
      "clearscope",
      "marketmuse",
      "perplexity-ai",
      "notebooklm",
      "google-analytics-4",
    ],
    workflow: {
      description:
        "Data-driven SEO workflow from keyword research to content optimization",
      steps: [
        "Identify content gaps with MarketMuse (analyze what competitors rank for)",
        "Research keywords and search intent with Surfer SEO",
        "Analyze top-ranking content with NotebookLM (upload top 10 results)",
        "Create comprehensive content brief with Clearscope",
        "Verify facts and statistics with Perplexity AI (cited sources)",
        "Optimize content in real-time with Clearscope or Surfer SEO",
      ],
    },
    examplePrompts: [
      "Analyze the top 10 ranking articles for '[keyword]' and identify common themes, content depth, and gaps I can fill.",
      "Create a comprehensive content brief for '[topic]' that targets '[keyword]' and related semantic keywords.",
    ],
  },
  {
    id: "content-research",
    title: "Research Content Topics Efficiently",
    description:
      "Quickly research and synthesize information from multiple sources. Analyze competitor content, industry trends, and gather data for comprehensive content.",
    category: "seo-research",
    tags: [
      "research",
      "analysis",
      "competitors",
      "trends",
      "data",
      "sources",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Hours instead of days",
    recommendedTools: [
      "notebooklm",
      "perplexity-ai",
      "claude",
      "marketmuse",
    ],
    workflow: {
      description:
        "AI-powered research workflow for comprehensive content analysis",
      steps: [
        "Upload all research sources to NotebookLM (competitor blogs, reports, articles)",
        "Ask questions across all documents simultaneously with NotebookLM",
        "Fact-check key statistics with Perplexity AI (get cited sources)",
        "Synthesize findings with Claude (excellent for analysis and synthesis)",
        "Identify content opportunities with MarketMuse",
      ],
    },
    examplePrompts: [
      "Analyze these 20 competitor articles and identify the 5 most common themes and 3 major gaps in coverage.",
      "What are the latest trends in [industry] based on these reports? Summarize in 5 key points.",
      "Find statistics about [topic] published in the last 6 months. Include sources.",
    ],
  },

  // ========================================
  // VIDEO MARKETING GOALS
  // ========================================
  {
    id: "create-video-content",
    title: "Create Professional Video Content",
    description:
      "Produce high-quality marketing videos without expensive equipment or studios. Generate AI videos, create avatar-based content, or edit efficiently.",
    category: "video-marketing",
    tags: [
      "video",
      "marketing",
      "production",
      "content",
      "visual",
      "youtube",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Days instead of weeks",
    recommendedTools: [
      "heygen",
      "synthesia",
      "sora-2",
      "runway-gen-4",
      "descript",
      "google-veo-3",
      "luma-ray-3",
    ],
    workflow: {
      description:
        "End-to-end video creation workflow from script to finished video",
      steps: [
        "Write video script with ChatGPT or Claude",
        "Choose approach: AI avatar (HeyGen/Synthesia) or AI-generated video (Sora 2/Runway)",
        "For avatar videos: Create video with HeyGen or Synthesia (no filming needed)",
        "For AI video: Generate scenes with Sora 2 or Runway Gen-4",
        "Edit and refine with Descript (edit video by editing transcript)",
        "Add voiceover with ElevenLabs if needed",
      ],
    },
    examplePrompts: [
      "Write a 90-second video script explaining [product/service] to [target audience]. Include hook, 3 key benefits, and clear CTA.",
      "Create a storyboard for a 30-second social media video about [topic].",
    ],
  },
  {
    id: "create-avatar-videos",
    title: "Create AI Avatar Videos Without Filming",
    description:
      "Build a library of talking-head videos without cameras or studios. Perfect for training, explainers, and consistent brand messaging.",
    category: "video-marketing",
    tags: [
      "avatar",
      "video",
      "talking-head",
      "training",
      "presentation",
      "no-camera",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per video",
    recommendedTools: ["heygen", "synthesia", "elevenlabs"],
    workflow: {
      description:
        "Create unlimited avatar videos without ever filming",
      steps: [
        "Write script with ChatGPT (conversational, clear talking points)",
        "Choose avatar in HeyGen or Synthesia (240+ options or create custom)",
        "Generate video (AI avatar speaks your script with natural expressions)",
        "For multilingual: Use HeyGen's lip-synced translations (140+ languages)",
        "Download and distribute",
      ],
    },
    examplePrompts: [
      "Write a friendly 60-second script for a training video explaining [process] to new employees.",
      "Create a professional script for a product demo video highlighting [features].",
    ],
  },
  {
    id: "repurpose-video-content",
    title: "Repurpose Videos for Social Media",
    description:
      "Turn long-form videos (podcasts, webinars, interviews) into dozens of short clips optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    category: "video-marketing",
    tags: [
      "repurposing",
      "social media",
      "clips",
      "shorts",
      "tiktok",
      "reels",
      "video",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "1 hour → 20+ clips",
    recommendedTools: ["opusclip", "descript", "castmagic", "munch", "vidyo-ai"],
    workflow: {
      description:
        "Automated workflow to extract viral-worthy clips from long videos",
      steps: [
        "Upload long-form video to OpusClip or Munch",
        "AI analyzes and identifies the most engaging moments automatically",
        "Review AI-selected clips (typically finds 10-30 clips per hour of content)",
        "Customize captions, hooks, and CTAs with AI suggestions",
        "Export in vertical format optimized for each platform",
        "Schedule and distribute",
      ],
    },
    examplePrompts: [
      "Identify the 10 most shareable moments from this 60-minute podcast interview and create clips optimized for Instagram Reels.",
      "Turn this webinar into 15 educational clips with captions. Each clip should teach one specific concept.",
    ],
  },
  {
    id: "create-voiceover-content",
    title: "Create Professional Voiceovers",
    description:
      "Generate natural-sounding voiceovers in multiple voices and languages. Perfect for videos, podcasts, audiobooks, and narration without hiring voice actors.",
    category: "video-marketing",
    tags: [
      "voice",
      "audio",
      "voiceover",
      "narration",
      "text-to-speech",
      "multilingual",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per voiceover",
    recommendedTools: ["elevenlabs", "descript", "adobe-audio"],
    workflow: {
      description:
        "AI-powered voiceover creation for any content type",
      steps: [
        "Write or upload your script",
        "Choose voice (ElevenLabs: 100+ voices or clone your own)",
        "Adjust tone, pace, and emotion settings",
        "Generate voiceover (ultra-realistic, includes natural pauses)",
        "Edit timing with Descript if needed",
        "Download and add to your video or podcast",
      ],
    },
    examplePrompts: [
      "Create a warm, friendly voiceover for this 2-minute explainer video script. Female voice, medium pace.",
      "Generate a professional narration for this training video in English, then create versions in Spanish and French.",
    ],
  },
  {
    id: "draft-video-scripts",
    title: "Draft Video Scripts",
    description:
      "Write clear, engaging video scripts for explainers, ads, tutorials, and social content. Use AI to structure, refine, and adapt scripts for different channels.",
    category: "video-marketing",
    tags: [
      "writing",
      "scripts",
      "video",
      "storytelling",
      "explainer",
      "ads",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "30–90 minutes per script",
    recommendedTools: ["chatgpt", "claude", "jasper-ai"],
    workflow: {
      description:
        "AI-assisted workflow for drafting and refining video scripts",
      steps: [
        "Describe your target audience, goal, and video length to ChatGPT or Claude.",
        "Ask AI to propose 2–3 different hooks and outlines.",
        "Select the best outline and have AI draft a full script with scene-by-scene narration.",
        "Iterate on tone, length, and CTAs with Jasper AI or Claude.",
        "Adapt the script for different platforms (YouTube, Reels, TikTok).",
      ],
    },
    examplePrompts: [
      "Write a 60-second video script for [platform] about [topic] for [audience]. Include a strong hook, 3 key points, and a clear call to action.",
      "Write a 2-minute product demo video script for [product] aimed at [audience]. Use a problem → solution → benefits → CTA structure.",
      "Give me 3 alternate hooks and openings for a 60-second vertical video about [topic] to use on [platform].",
    ],
  },

  // ========================================
  // AUDIO & PODCAST GOALS
  // ========================================
  {
    id: "create-podcast-series",
    title: "Launch a Podcast Series",
    description:
      "Start a podcast from scratch with AI-powered planning, scripting, recording, editing, and distribution. Build an engaged audio audience.",
    category: "audio-marketing",
    tags: [
      "podcast",
      "audio",
      "series",
      "content",
      "voice",
      "distribution",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "2-4 weeks to launch",
    recommendedTools: [
      "riverside-fm",
      "descript",
      "castmagic",
      "elevenlabs",
      "podcastle",
    ],
    workflow: {
      description:
        "Complete podcast launch workflow from concept to distribution",
      steps: [
        "Plan series with ChatGPT (topics, episode outlines, guest ideas)",
        "Record with Riverside.fm (studio-quality remote recording)",
        "Edit with Descript (edit audio by editing transcript)",
        "Generate show notes and promotional content with Castmagic",
        "Create intro/outro music with AI music tools",
        "Distribute to Apple Podcasts, Spotify, YouTube",
      ],
    },
    examplePrompts: [
      "Help me plan a 10-episode podcast series about [topic] for [audience]. Suggest episode titles, key talking points, and potential guests.",
      "Write an engaging intro script for my podcast '[podcast name]' that explains what listeners will learn and why they should subscribe.",
    ],
  },
  {
    id: "grow-podcast-audience",
    title: "Grow Podcast Audience",
    description:
      "Increase podcast downloads and build a loyal listener base using AI-powered promotion, repurposing, and audience engagement strategies.",
    category: "audio-marketing",
    tags: [
      "podcast",
      "growth",
      "audience",
      "promotion",
      "marketing",
      "distribution",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Ongoing",
    recommendedTools: [
      "castmagic",
      "opusclip",
      "buffer-ai",
      "claude",
      "chatgpt",
    ],
    workflow: {
      description:
        "Multi-channel podcast promotion and growth strategy",
      steps: [
        "Repurpose episodes with Castmagic (blog posts, social content, email newsletters)",
        "Create video clips with OpusClip (promote on TikTok, Instagram, YouTube Shorts)",
        "Write episode threads for Twitter/LinkedIn with Claude",
        "Schedule promotional content across platforms with Buffer",
        "Build email list with episode highlights and exclusive content",
        "Collaborate with other podcasters for cross-promotion",
      ],
    },
    examplePrompts: [
      "Analyze my podcast analytics and suggest 5 specific strategies to increase downloads by 50% in 3 months.",
      "Create a 30-day social media promotion plan for my podcast, including post ideas for LinkedIn, Twitter, and Instagram.",
    ],
  },

  // ========================================
  // SOCIAL MEDIA GOALS
  // ========================================
  {
    id: "social-media-content",
    title: "Create Engaging Social Media Content",
    description:
      "Generate platform-optimized posts, captions, and visuals for Instagram, LinkedIn, Twitter, and TikTok. Maintain consistent posting without burnout.",
    category: "social-media",
    tags: [
      "social media",
      "content",
      "posts",
      "captions",
      "engagement",
      "instagram",
      "linkedin",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "30 minutes for a week's content",
    recommendedTools: ["chatgpt", "claude", "buffer-ai", "canva-ai", "metricool"],
    workflow: {
      description:
        "Batch create and schedule social media content efficiently",
      steps: [
        "Brainstorm content themes with ChatGPT (one week at a time)",
        "Generate platform-specific posts (LinkedIn: professional insights, Instagram: visual + story, Twitter: quick takes)",
        "Create graphics with Canva AI",
        "Write captions with Claude (maintains brand voice)",
        "Schedule with Buffer (optimal posting times)",
        "Track performance and iterate",
      ],
    },
    examplePrompts: [
      "Create 5 LinkedIn posts about [topic] for [audience]. Make them thought-provoking and encourage engagement.",
      "Write 10 Instagram captions for posts about [product/service]. Include relevant hashtags and CTAs.",
    ],
  },

  // ========================================
  // EMAIL & AUTOMATION GOALS
  // ========================================
  {
    id: "email-marketing-campaigns",
    title: "Create AI-Powered Email Campaigns",
    description:
      "Design, write, and optimize email campaigns that convert. Use AI for copywriting, subject lines, personalization, and A/B testing.",
    category: "automation",
    tags: [
      "email",
      "marketing",
      "campaigns",
      "copywriting",
      "automation",
      "newsletters",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "1-2 hours per campaign",
    recommendedTools: [
      "mailchimp",
      "klaviyo",
      "hubspot-ai",
      "chatgpt",
      "grammarly",
    ],
    workflow: {
      description:
        "AI-optimized email marketing from creation to delivery",
      steps: [
        "Draft email copy with ChatGPT (based on campaign goal)",
        "Polish with Grammarly (tone, clarity, engagement)",
        "Upload to Mailchimp or HubSpot",
        "Let AI test 100 subject line variations (HubSpot AI Campaigns)",
        "Send at optimal time (AI-powered send-time optimization)",
        "Analyze results and iterate",
      ],
    },
    examplePrompts: [
      "Write a welcome email sequence (3 emails) for new subscribers to [business]. Email 1: Welcome and set expectations. Email 2: Share top resource. Email 3: Introduce product/service.",
      "Create a promotional email for [offer] targeting [audience]. Include compelling subject line, preview text, and clear CTA.",
    ],
  },
  {
    id: "workflow-automation",
    title: "Automate Marketing Workflows",
    description:
      "Connect your tools and automate repetitive tasks. Save hours weekly by letting AI handle routine work while you focus on strategy.",
    category: "automation",
    tags: [
      "automation",
      "workflows",
      "efficiency",
      "integration",
      "productivity",
      "zapier",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "5-10 hours saved per week",
    recommendedTools: ["zapier", "notion-ai", "hubspot-ai", "make-com"],
    workflow: {
      description:
        "Set up automated workflows that run 24/7",
      steps: [
        "Identify repetitive tasks (copy-pasting data, publishing content, sending notifications)",
        "Browse Zapier templates for your use case",
        "Connect your apps (ChatGPT, WordPress, Buffer, Slack, Google Sheets, etc.)",
        "Set up automation triggers and actions",
        "Test workflow",
        "Let it run automatically",
      ],
    },
    examplePrompts: [
      "Example workflow: 'When new blog post is published on WordPress → Create social media posts with ChatGPT → Schedule in Buffer → Add to content calendar in Google Sheets → Notify team in Slack'",
    ],
  },

  // ========================================
  // SPECIALIZED GOALS
  // ========================================
  {
    id: "multilingual-content",
    title: "Create Multilingual Content",
    description:
      "Expand to international markets with AI-powered translations and localized content. Create videos, audio, and written content in 100+ languages.",
    category: "content-marketing",
    tags: [
      "multilingual",
      "translation",
      "localization",
      "international",
      "languages",
      "global",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Same content, 100+ languages",
    recommendedTools: ["heygen", "synthesia", "elevenlabs", "claude"],
    workflow: {
      description:
        "Localize content for international audiences",
      steps: [
        "Create original content in primary language",
        "For videos: Use HeyGen or Synthesia for lip-synced translations (140+ languages)",
        "For voiceovers: Generate in target language with ElevenLabs (29+ languages)",
        "For written content: Translate with Claude (maintains tone and context)",
        "Review with native speaker if possible",
        "Distribute to local markets",
      ],
    },
    examplePrompts: [
      "Translate this blog post into Spanish, French, and German while maintaining the conversational tone and cultural nuances.",
      "Create a 60-second product video in English, then generate lip-synced versions in Mandarin, Hindi, and Portuguese.",
    ],
  },
  {
    id: "content-repurposing",
    title: "Repurpose Content Across Formats",
    description:
      "Maximize content ROI by transforming one piece into many. Turn blogs into videos, podcasts into articles, webinars into social clips.",
    category: "content-marketing",
    tags: [
      "repurposing",
      "content",
      "efficiency",
      "roi",
      "multi-format",
      "productivity",
      "writing",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "One asset → 10+ formats",
    recommendedTools: [
      "castmagic",
      "opusclip",
      "claude",
      "heygen",
      "descript",
      "munch",
      "repurpose-io",
    ],
    workflow: {
      description:
        "Transform one content piece into multiple formats",
      steps: [
        "Start with long-form content (podcast episode, webinar, blog post)",
        "For podcast/video: Extract clips with OpusClip or Munch, generate blog post with Castmagic",
        "For blog: Create video version with HeyGen (avatar reads adapted script)",
        "Generate social posts with Claude (different angles for different platforms)",
        "Create carousel posts, quote graphics with Canva AI",
        "Distribute everywhere",
      ],
    },
    examplePrompts: [
      "Turn this blog post into a 5-post LinkedIn carousel. Extract the key points and create engaging slide titles.",
      "Convert this podcast transcript into a 1000-word blog post. Maintain conversational tone but make it readable.",
    ],
  },
  {
    id: "create-ai-images",
    title: "Create AI-Generated Images",
    description:
      "Generate custom images, graphics, and visual content using AI. Perfect for blog headers, social media posts, ads, and marketing materials.",
    category: "content-marketing",
    tags: [
      "images",
      "graphics",
      "visual",
      "design",
      "ai-generation",
      "social-media",
      "marketing",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per image",
    recommendedTools: [
      "midjourney",
      "dall-e-3",
      "ideogram",
      "leonardo-ai",
      "canva-ai",
      "flux-ai",
    ],
    workflow: {
      description: "AI-powered image creation workflow",
      steps: [
        "Define your image concept and style",
        "Write a detailed prompt describing the image",
        "Generate with Midjourney (best quality), DALL-E 3 (fast), or Leonardo AI (customizable)",
        "Refine with variations if needed",
        "Edit and add text with Canva AI",
        "Download and use in your marketing",
      ],
    },
    examplePrompts: [
      "Create a professional header image for a blog post about [topic]. Style: modern, clean, tech-focused. Size: 1200x630px.",
      "Generate a social media graphic showing [concept]. Make it eye-catching and Instagram-friendly.",
      "Design a product mockup showing [product] in a [setting]. Photorealistic style.",
    ],
  },

  // ========================================
  // NEW GOALS — BATCH 2
  // ========================================
  {
    id: "professional-headshots",
    title: "Get Professional AI Headshots",
    description:
      "Create studio-quality professional headshots using AI — no photographer required. Perfect for LinkedIn profiles, team websites, speaker bios, and personal branding.",
    category: "content-marketing",
    tags: [
      "headshots",
      "photos",
      "professional",
      "linkedin",
      "personal-brand",
      "portrait",
      "team",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Under 1 hour",
    recommendedTools: [
      "aragon-ai",
      "headshotpro",
      "profile-picture-ai",
      "remini",
    ],
    workflow: {
      description:
        "Generate professional headshots from casual photos using AI",
      steps: [
        "Gather 10-20 existing photos (different angles, lighting, expressions)",
        "Upload to Aragon AI or HeadshotPro",
        "Select your preferred styles and backgrounds",
        "AI generates 40-100+ professional headshot variations",
        "Download your favorites",
        "Update LinkedIn, website team page, speaker bio, and social profiles",
      ],
    },
    examplePrompts: [
      "I need a professional LinkedIn headshot that looks approachable and confident. Business casual style, clean background.",
      "Create a consistent set of headshots for my 8-person team. Corporate style with a white background.",
      "I need a headshot that works for both my professional website and my personal social media. Friendly but polished.",
    ],
  },
  {
    id: "create-ad-creatives",
    title: "Create High-Converting Ad Creatives",
    description:
      "Design and generate ad creatives for Facebook, Instagram, Google, and LinkedIn that drive clicks and conversions. Use AI to produce dozens of variations fast.",
    category: "automation",
    tags: [
      "ads",
      "advertising",
      "creative",
      "facebook",
      "instagram",
      "google-ads",
      "conversion",
      "paid-social",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Hours instead of days",
    recommendedTools: [
      "adcreative-ai",
      "canva-ai",
      "pencil-ai",
      "creatopy",
      "foreplay-co",
    ],
    workflow: {
      description:
        "AI-powered ad creative production from research to launch",
      steps: [
        "Research competitor ads with Foreplay (save and analyze what's working in your market)",
        "Generate creative brief from research using Foreplay's AI Brief Generator",
        "Produce ad variations with AdCreative.ai (hundreds of creatives from your brand assets)",
        "Resize for all platforms and ad formats with Creatopy (one design → 15+ sizes)",
        "Score predicted performance before spending (Pencil AI)",
        "Launch top performers and analyze results with Motion",
      ],
    },
    examplePrompts: [
      "Create 5 Facebook ad creative concepts for [product] targeting [audience]. Each concept should have a different hook: problem-focused, social proof, curiosity, urgency, and benefit-led.",
      "Write 10 ad headlines and 5 body copy variations for a Google Search campaign promoting [service].",
      "Design a carousel ad for Instagram showcasing [product] with 5 slides. Each slide highlights one key benefit.",
    ],
  },
  {
    id: "linkedin-content-strategy",
    title: "Build a LinkedIn Presence & Strategy",
    description:
      "Grow your professional brand on LinkedIn with consistent, high-value content. Generate thought leadership posts, engage your network, and turn followers into clients.",
    category: "social-media",
    tags: [
      "linkedin",
      "b2b",
      "professional",
      "thought-leadership",
      "content",
      "personal-brand",
      "networking",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "30 minutes per week",
    recommendedTools: [
      "taplio",
      "chatgpt",
      "claude",
      "canva-ai",
      "buffer-ai",
      "linkedin-ads",
    ],
    workflow: {
      description:
        "Build consistent LinkedIn thought leadership content system",
      steps: [
        "Identify your 3-5 core content pillars (areas of expertise you'll post about)",
        "Use Taplio to research what's performing in your industry right now",
        "Write 5-10 posts per week with Claude or ChatGPT (text posts, carousels, polls)",
        "Create branded carousel graphics with Canva AI",
        "Schedule posts with Buffer or Taplio's scheduler",
        "Engage with comments and amplify reach through consistent interaction",
        "Use LinkedIn Thought Leader Ads to boost top-performing posts to new audiences",
      ],
    },
    examplePrompts: [
      "Write 5 LinkedIn posts for a [job title] in [industry] that will generate engagement and position them as a thought leader. Mix formats: one story, one list, one opinion, one tip, one question.",
      "Create a LinkedIn content calendar for [month] covering my expertise in [topic]. Include post ideas, hooks, and formats.",
      "Write a compelling LinkedIn About section for [role] that tells my professional story and attracts [target audience].",
    ],
  },
  {
    id: "youtube-channel-growth",
    title: "Grow a YouTube Channel",
    description:
      "Build and grow a YouTube channel using AI-powered content creation, optimization, and repurposing. Create videos faster and reach more viewers with AI-optimized titles, descriptions, and thumbnails.",
    category: "video-marketing",
    tags: [
      "youtube",
      "video",
      "channel",
      "growth",
      "seo",
      "thumbnails",
      "shorts",
      "content",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Ongoing",
    recommendedTools: [
      "chatgpt",
      "claude",
      "descript",
      "canva-ai",
      "opusclip",
      "vidyo-ai",
      "surfer-seo",
    ],
    workflow: {
      description:
        "Complete YouTube content system from research to growth",
      steps: [
        "Research trending topics in your niche with Perplexity AI and YouTube search",
        "Script videos with ChatGPT or Claude (hook, content, CTA structure)",
        "Record and edit with Descript (transcription-based editing removes filler words)",
        "Design eye-catching thumbnails with Canva AI (A/B test two versions)",
        "Optimize titles, descriptions, and tags using YouTube SEO best practices",
        "Repurpose long videos into YouTube Shorts with OpusClip or Vidyo.ai",
        "Track performance and double down on what works",
      ],
    },
    examplePrompts: [
      "Research the top 10 performing YouTube videos about [topic] and identify common patterns in titles, thumbnails, and content structure.",
      "Write a YouTube video script about [topic] for [audience]. Use the AIDA framework: Attention, Interest, Desire, Action. Target length: [X] minutes.",
      "Create 5 YouTube title variations for a video about [topic]. Make them compelling, keyword-rich, and optimized for click-through rate.",
    ],
  },
  {
    id: "email-newsletter-business",
    title: "Build an Email Newsletter",
    description:
      "Launch and grow a newsletter that keeps your audience engaged and builds a direct relationship with subscribers. Use AI to write consistently and grow your list.",
    category: "automation",
    tags: [
      "email",
      "newsletter",
      "subscribers",
      "creator",
      "content",
      "list-building",
      "monetization",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "2-4 hours per issue",
    recommendedTools: [
      "beehiiv",
      "convertkit",
      "substack",
      "chatgpt",
      "claude",
      "grammarly",
    ],
    workflow: {
      description:
        "Build and send a consistent, high-quality email newsletter",
      steps: [
        "Choose your platform: Beehiiv (monetization focus), Kit/ConvertKit (creator tools), or Substack (built-in audience)",
        "Define your newsletter's niche, cadence, and value proposition",
        "Use ChatGPT or Claude to brainstorm issue topics and outline content",
        "Draft newsletter with AI assistance, maintaining your unique voice",
        "Polish with Grammarly before sending",
        "Grow your list through Beehiiv Boosts, Substack Notes, or lead magnets",
        "Analyze open rates and click-through rates to improve each issue",
      ],
    },
    examplePrompts: [
      "Write the first issue of my newsletter about [topic] for [audience]. Include a welcome introduction, 3 key insights, one resource recommendation, and a closing call-to-action.",
      "Create a 4-week content plan for my newsletter about [niche]. Each week should cover a different angle and provide genuine value to [audience].",
      "Write 5 lead magnet ideas to grow my newsletter list in [niche]. For each idea, describe what it includes and why subscribers would want it.",
    ],
  },
  {
    id: "seo-blog-writing",
    title: "Write SEO-Optimized Blog Posts That Rank",
    description:
      "Create blog content specifically designed to rank on Google. Research keywords, analyze competition, write comprehensive posts, and optimize every element for search.",
    category: "seo-research",
    tags: [
      "seo",
      "blog",
      "writing",
      "ranking",
      "keywords",
      "google",
      "organic-traffic",
      "content",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "3-5 hours per post",
    recommendedTools: [
      "ahrefs",
      "semrush",
      "surfer-seo",
      "neuronwriter",
      "frase-io",
      "chatgpt",
      "claude",
      "grammarly",
      "rankmath",
    ],
    workflow: {
      description:
        "Research-first workflow for writing blog posts that rank on Google",
      steps: [
        "Find keyword opportunities with Ahrefs or SEMrush (low difficulty, decent volume)",
        "Analyze top 10 ranking pages: word count, headings, content structure",
        "Create a comprehensive content brief with NeuronWriter or Surfer SEO",
        "Draft the post with ChatGPT or Claude following the brief exactly",
        "Optimize content with Surfer SEO real-time scoring (aim for 70+ score)",
        "Add schema markup and on-page SEO with Rank Math (WordPress)",
        "Submit to Google Search Console and monitor rankings",
      ],
    },
    examplePrompts: [
      "I want to rank for '[keyword].' Create a detailed content brief including: suggested title, target word count, required H2/H3 headings, key questions to answer, and semantic keywords to include.",
      "Write a comprehensive 2000-word blog post about '[topic]' that covers [key subtopics]. Optimize for the primary keyword '[keyword]' and related terms.",
      "Analyze the top-ranking article for '[keyword]' and tell me what I need to cover to outrank it. What topics are missing? What can I do better?",
    ],
  },
  {
    id: "social-media-scheduling",
    title: "Schedule & Automate Social Media Posts",
    description:
      "Plan, create, and schedule weeks of social media content in one session. Use AI to generate content in bulk and automation to publish consistently across all platforms.",
    category: "social-media",
    tags: [
      "social media",
      "scheduling",
      "automation",
      "posting",
      "consistency",
      "content-calendar",
      "batch-creation",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "2 hours → 30 days of content",
    recommendedTools: [
      "buffer-ai",
      "later",
      "metricool",
      "flick-ai",
      "chatgpt",
      "canva-ai",
    ],
    workflow: {
      description:
        "Batch create and schedule 30 days of social content in one sitting",
      steps: [
        "Define your content pillars (3-5 core themes you post about)",
        "Use ChatGPT to generate 30+ post ideas across your pillars",
        "Write all captions in batch with Flick AI or ChatGPT",
        "Create graphics and visuals in batch with Canva AI",
        "Upload everything to Later, Buffer, or Metricool",
        "Schedule posts at AI-recommended optimal times for your audience",
        "Review analytics weekly and refine your strategy",
      ],
    },
    examplePrompts: [
      "Create a 30-day social media content calendar for [business type] in [industry]. Include post ideas for Instagram, LinkedIn, and Twitter. Mix educational, entertaining, and promotional content in a 4-1-1 ratio.",
      "Write 10 social media captions about [topic] optimized for Instagram. Each should have a hook, value, and CTA. Include 5 relevant hashtags.",
      "Generate a week of LinkedIn posts for a [role] in [industry]. Monday: motivation, Tuesday: tip, Wednesday: industry insight, Thursday: story, Friday: question.",
    ],
  },
  {
    id: "aio-optimization",
    title: "Optimize for AI Search (AIO)",
    description:
      "Get your content cited and featured by AI search engines like ChatGPT, Perplexity, and Google AI Overviews. AIO (AI Optimization) is the next evolution of SEO.",
    category: "seo-research",
    tags: [
      "aio",
      "seo",
      "ai-search",
      "perplexity",
      "chatgpt-search",
      "google-ai",
      "optimization",
      "visibility",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Ongoing content updates",
    recommendedTools: [
      "perplexity-ai",
      "frase-io",
      "chatgpt",
      "claude",
      "surfer-seo",
      "notebooklm",
      "google-search-console",
    ],
    workflow: {
      description:
        "Optimize your content to be cited and featured in AI-powered search results",
      steps: [
        "Search your key topics in Perplexity and ChatGPT Search — see who's being cited (is it you or competitors?)",
        "Audit your content: Add FAQ sections, direct answers to common questions, and structured headers",
        "Rewrite key pages to answer questions conversationally — AI loves extractable answers",
        "Add statistics, examples, and authoritative citations (AI prefers citing credible, specific content)",
        "Use Google Search Console to track which queries drive impressions from AI Overviews",
        "Update content quarterly to keep it fresh and relevant for AI training",
      ],
    },
    examplePrompts: [
      "Search '[my business topic]' in Perplexity. What sources are being cited? What questions are being answered? How can I create content that gets cited instead?",
      "Rewrite this blog section to be more AIO-friendly. The goal is for AI search engines to extract and cite it when answering questions about [topic].",
      "Create an FAQ section for my page about [topic] that directly answers the 10 most common questions people ask. Use conversational language that AI can easily extract.",
    ],
  },
  {
    id: "content-repurposing-automation",
    title: "Automate Content Repurposing Across Platforms",
    description:
      "Set up automated systems that turn every piece of content you create into multiple formats across multiple platforms — automatically. Record once, publish everywhere.",
    category: "automation",
    tags: [
      "repurposing",
      "automation",
      "cross-platform",
      "content",
      "efficiency",
      "workflow",
      "distribution",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Set up once, saves hours weekly",
    recommendedTools: [
      "repurpose-io",
      "zapier",
      "castmagic",
      "swell-ai",
      "make-com",
      "opusclip",
    ],
    workflow: {
      description:
        "Build automated repurposing pipelines that distribute content 24/7",
      steps: [
        "Map your content flow: Where does content start? (podcast, YouTube, blog, live stream)",
        "Set up Repurpose.io to auto-distribute: podcast → YouTube, YouTube → TikTok/Reels/Shorts",
        "Connect Castmagic or Swell AI to auto-generate show notes, blog posts, and social captions from every episode",
        "Use Zapier or Make to trigger additional automations (new blog post → social posts → email newsletter)",
        "Review and approve AI-generated content weekly (takes 30 min vs. 4 hours manually)",
        "Track what's performing across platforms and refine your automation rules",
      ],
    },
    examplePrompts: [
      "Design an automated content repurposing workflow for a podcast. Starting from one audio recording, what should automatically be created and distributed, and which tools handle each step?",
      "I publish YouTube videos weekly. Build me an automation plan that turns each video into: 3 Shorts, 5 social posts, 1 blog post, and 1 email newsletter — with minimal manual effort.",
      "What's the most efficient repurposing workflow for a solo content creator with limited time? Map out the ideal setup using AI tools.",
    ],
  },
  {
    id: "image-editing-enhancement",
    title: "Edit & Enhance Images for Marketing",
    description:
      "Use AI to quickly edit, enhance, and optimize photos and graphics for marketing. Remove backgrounds, improve quality, relight products, and create professional visuals without a design team.",
    category: "content-marketing",
    tags: [
      "image-editing",
      "photos",
      "design",
      "product-photos",
      "background-removal",
      "enhancement",
      "e-commerce",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per image",
    recommendedTools: [
      "remove-bg",
      "photoroom",
      "clipdrop",
      "adobe-photoshop-ai",
      "topaz-labs",
      "canva-ai",
    ],
    workflow: {
      description:
        "AI-powered image editing for professional marketing visuals",
      steps: [
        "Remove backgrounds from product photos with Remove.bg (one click, instant)",
        "Enhance product shots with Photoroom (add AI backgrounds, adjust lighting)",
        "Upscale low-resolution images with Topaz Photo AI (print-ready quality)",
        "Remove unwanted objects and relight images with Clipdrop",
        "Make advanced edits with Adobe Photoshop Generative Fill (add/remove anything)",
        "Add text, graphics, and brand elements with Canva AI",
        "Export in the right format for each marketing channel",
      ],
    },
    examplePrompts: [
      "I have product photos with messy backgrounds. What's the fastest workflow to make them look professional for my e-commerce store?",
      "How do I use AI to make phone-camera photos look like they were shot in a professional studio?",
      "I need 50 product images with consistent white backgrounds for my website. What's the most efficient AI workflow to do this quickly?",
    ],
  },

  {
    id: "brand-audio-music",
    title: "Create Brand Music & Audio Identity",
    description:
      "Build a consistent sonic brand identity using AI — custom jingles, podcast intro music, background tracks for videos and social content, and brand-matched audio. No musicians or studios required.",
    category: "audio-marketing",
    tags: [
      "music",
      "audio",
      "jingle",
      "sonic-branding",
      "brand-audio",
      "background-music",
      "podcast",
      "voice",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per track",
    recommendedTools: [
      "suno",
      "elevenlabs",
      "adobe-audio",
      "descript",
    ],
    workflow: {
      description:
        "Create a complete brand audio identity using AI tools",
      steps: [
        "Define your brand sonic personality: upbeat or calm, professional or playful, what instruments fit your brand?",
        "Generate your brand jingle or intro music with Suno (describe style, mood, tempo, instruments)",
        "Use Suno Personas to lock in a consistent vocal style across all brand music",
        "Generate podcast intro/outro or video background music variations",
        "Create voiceovers with ElevenLabs (clone your own voice or use Voice Design v3)",
        "Generate custom video soundtrack music with Adobe Generate Speech & Soundtrack",
        "Edit and sync audio to video content with Descript",
      ],
    },
    examplePrompts: [
      "Create a 15-second brand jingle for a [business type]. Style: [upbeat/professional/warm]. Instruments: [piano/guitar/synth]. Mood: [energetic/calm/trustworthy].",
      "Generate background music for my weekly marketing podcast. Style: modern, professional, subtle — should not distract from conversation. 60 seconds, loops cleanly.",
      "Create 3 variations of intro music for my YouTube channel about [topic]: one energetic, one calm, one inspirational.",
      "I need a sonic logo — a 3-5 second audio signature that plays at the end of all my videos. Brand personality: [describe your brand].",
    ],
  },
];

/**
 * Get goal by ID
 */
export function getGoalById(id: string): MarketingGoal | undefined {
  return MARKETING_GOALS.find((goal) => goal.id === id);
}

/**
 * Get goals by category
 */
export function getGoalsByCategory(category: string): MarketingGoal[] {
  return MARKETING_GOALS.filter((goal) => goal.category === category);
}

/**
 * Get all goals
 */
export function getAllGoals(): MarketingGoal[] {
  return MARKETING_GOALS;
}

/**
 * Search goals by keyword
 */

// SEMANTIC SEARCH - Topic-based with precise matching

const TOPIC_KEYWORDS: Record<string, string[]> = {
  // Podcast-related searches - only match podcast/audio
  "podcast": ["podcast", "audio"],
  "create podcast": ["podcast", "audio"],
  "launch podcast": ["podcast", "audio"],
  "start podcast": ["podcast", "audio"],
  "grow podcast": ["podcast", "audio"],

  // Video-related searches
  "video": ["video"],
  "create video": ["video"],
  "video editing": ["video", "editing"],
  "edit video": ["video", "editing"],
  "video production": ["video", "production"],

  // YouTube-related searches
  "youtube": ["youtube"],
  "youtube channel": ["youtube", "channel"],
  "grow youtube": ["youtube", "growth"],
  "youtube shorts": ["youtube", "shorts"],
  "youtube seo": ["youtube", "seo"],

  // Avatar-related searches
  "avatar": ["avatar"],
  "create avatar": ["avatar"],
  "personal avatar": ["avatar"],
  "ai avatar": ["avatar"],

  // Writing-related searches
  "writing": ["writing", "content", "blog"],
  "writing assistant": ["writing", "content", "blog"],
  "blog writing": ["blog", "writing", "content"],
  "content writing": ["writing", "content", "blog"],
  "blog": ["blog", "writing", "content"],
  "email campaigns": ["email", "campaigns"],
  "email copywriting": ["email", "copywriting"],
  "video scripts": ["scripts", "video", "writing"],
  "script writing": ["scripts", "video"],
  "social media writing": ["social media", "captions", "posts"],
  "product descriptions": ["writing", "content", "e-commerce"],
  "ad copy": ["ads", "advertising", "copywriting"],
  "newsletter writing": ["newsletter", "email", "content"],
  "content repurposing": ["repurposing", "content", "multi-format"],

  // Voice/Audio-related searches
  "voiceover": ["voice", "audio", "narration"],
  "voice over": ["voice", "audio", "narration"],
  "voice cloning": ["voice", "audio"],
  "create voiceover": ["voice", "audio", "narration"],
  "voice": ["voice", "audio", "narration"],

  // Image-related searches
  "images": ["images", "graphics", "visual"],
  "create images": ["images", "graphics", "visual"],
  "ai images": ["images", "graphics", "visual"],
  "generate images": ["images", "graphics", "visual"],
  "image editing": ["image-editing", "photos", "design"],
  "edit images": ["image-editing", "photos"],
  "edit photos": ["image-editing", "photos", "enhancement"],
  "photo editing": ["image-editing", "photos"],
  "enhance photos": ["image-editing", "photos", "enhancement"],
  "background removal": ["image-editing", "background-removal"],
  "remove background": ["image-editing", "background-removal"],
  "product photos": ["image-editing", "product-photos", "e-commerce"],

  // Headshot-related searches
  "headshots": ["headshots", "photos", "professional"],
  "ai headshots": ["headshots", "photos", "professional"],
  "professional headshots": ["headshots", "photos", "professional"],
  "linkedin photo": ["headshots", "linkedin", "professional"],
  "profile photo": ["headshots", "photos", "profile"],

  // Social media-related searches
  "social media": ["social media", "posts", "content"],
  "social content": ["social media", "content"],
  "social": ["social media", "instagram", "linkedin"],
  "social media scheduling": ["scheduling", "social media", "automation"],
  "schedule posts": ["scheduling", "social media", "automation"],
  "instagram": ["social media", "instagram"],
  "tiktok": ["social media", "tiktok"],
  "twitter": ["social media", "twitter"],

  // LinkedIn-related searches
  "linkedin": ["linkedin", "b2b", "professional"],
  "linkedin content": ["linkedin", "content", "professional"],
  "linkedin growth": ["linkedin", "b2b", "networking"],
  "b2b marketing": ["b2b", "linkedin", "professional"],
  "thought leadership": ["linkedin", "thought-leadership", "professional"],

  // Email-related searches
  "email": ["email", "campaigns", "newsletters"],
  "email marketing": ["email", "campaigns"],
  "newsletter": ["newsletter", "email", "subscribers"],
  "email newsletter": ["newsletter", "email", "subscribers"],
  "build newsletter": ["newsletter", "subscribers", "list-building"],
  "grow email list": ["email", "newsletter", "list-building"],
  "cold email": ["email", "outreach", "sales"],

  // SEO-related searches
  "seo": ["seo", "search", "optimization"],
  "search optimization": ["seo", "optimization"],
  "rank on google": ["seo", "ranking", "google"],
  "seo blog": ["seo", "blog", "ranking"],
  "keyword research": ["seo", "keywords", "research"],

  // AIO-related searches
  "aio": ["aio", "ai-search", "optimization"],
  "ai search": ["aio", "ai-search", "perplexity"],
  "ai optimization": ["aio", "seo", "optimization"],
  "perplexity seo": ["aio", "perplexity", "ai-search"],
  "optimize for ai": ["aio", "ai-search", "optimization"],

  // Ads-related searches
  "ads": ["ads", "advertising", "creative"],
  "ad creatives": ["ads", "advertising", "creative"],
  "facebook ads": ["ads", "facebook", "advertising"],
  "google ads": ["ads", "google-ads", "advertising"],
  "paid ads": ["ads", "advertising", "paid-social"],
  "advertising": ["ads", "advertising", "creative"],
  "ad design": ["ads", "advertising", "creative"],

  // Repurposing-related searches
  "repurpose": ["repurposing", "content", "multi-format"],
  "repurpose content": ["repurposing", "content", "multi-format"],
  "repurpose video": ["repurposing", "video", "clips"],
  "repurpose automation": ["repurposing", "automation", "distribution"],

  // Music and sonic branding searches
  "music": ["music", "audio", "jingle", "sonic-branding"],
  "ai music": ["music", "audio", "jingle"],
  "jingle": ["jingle", "music", "sonic-branding"],
  "brand music": ["music", "sonic-branding", "brand-audio"],
  "sonic branding": ["sonic-branding", "music", "brand-audio"],
  "brand audio": ["brand-audio", "music", "audio"],
  "background music": ["background-music", "music", "audio"],
  "podcast music": ["music", "audio", "podcast"],
  "intro music": ["music", "audio", "podcast"],
  "audio branding": ["brand-audio", "sonic-branding", "music"],
  "suno": ["music", "audio", "jingle"],
};

export function searchGoals(keyword: string): MarketingGoal[] {
  const lowerKeyword = keyword.toLowerCase().trim();

  if (!lowerKeyword) {
    return MARKETING_GOALS;
  }

  // Check if we have a specific topic mapping
  const topicTerms = TOPIC_KEYWORDS[lowerKeyword];

  if (topicTerms) {
    // Use ONLY the mapped topic terms (no word fallback)
    return MARKETING_GOALS.filter((goal) => {
      const goalText = `${goal.title} ${goal.description} ${goal.tags.join(" ")}`.toLowerCase();
      // Match if ANY topic term is found
      return topicTerms.some(term => goalText.includes(term));
    });
  }

  // For unmapped searches: check if it's a partial match to any mapped phrase
  for (const [mappedPhrase, terms] of Object.entries(TOPIC_KEYWORDS)) {
    if (mappedPhrase.includes(lowerKeyword) || lowerKeyword.includes(mappedPhrase.split(' ')[0])) {
      return MARKETING_GOALS.filter((goal) => {
        const goalText = `${goal.title} ${goal.description} ${goal.tags.join(" ")}`.toLowerCase();
        return terms.some(term => goalText.includes(term));
      });
    }
  }

  // Final fallback: simple word match
  return MARKETING_GOALS.filter((goal) => {
    const goalText = `${goal.title} ${goal.description} ${goal.tags.join(" ")}`.toLowerCase();
    return goalText.includes(lowerKeyword);
  });
}
