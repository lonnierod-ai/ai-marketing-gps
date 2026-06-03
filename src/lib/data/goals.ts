import { MarketingGoal } from "@/types";

/**
 * Marketing Goals Database
 * Curated based on use cases from the AI Toolkit
 * Each goal maps to specific tools that help achieve it
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
      "transcription",
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
      "clipchamp",
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
    recommendedTools: ["heygen", "synthesia", "elevenlabs", "d-id", "tavus"],
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
      "transcription",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "1 hour â†’ 20+ clips",
    recommendedTools: ["opusclip", "descript", "castmagic", "submagic", "captions"],
    workflow: {
      description:
        "Automated workflow to extract viral-worthy clips from long videos",
      steps: [
        "Upload long-form video to OpusClip",
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
    recommendedTools: ["elevenlabs", "descript", "speechify"],
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
    estimatedTimeframe: "30â€“90 minutes per script",
    recommendedTools: ["chatgpt", "claude", "jasper-ai"],
    workflow: {
      description:
        "AI-assisted workflow for drafting and refining video scripts",
      steps: [
        "Describe your target audience, goal, and video length to ChatGPT or Claude.",
        "Ask AI to propose 2â€“3 different hooks and outlines.",
        "Select the best outline and have AI draft a full script with scene-by-scene narration.",
        "Iterate on tone, length, and CTAs with Jasper AI or Claude.",
        "Adapt the script for different platforms (YouTube, Reels, TikTok).",
      ],
    },
    examplePrompts: [
      "Write a 60-second video script for [platform] about [topic] for [audience]. Include a strong hook, 3 key points, and a clear call to action.",
      "Write a 2-minute product demo video script for [product] aimed at [audience]. Use a problem â†’ solution â†’ benefits â†’ CTA structure.",
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
      "transcription",
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
      "buffer",
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
    recommendedTools: ["chatgpt", "claude", "buffer", "canva-ai", "metricool"],
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
    recommendedTools: ["zapier", "notion-ai", "hubspot-ai"],
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
      "Example workflow: 'When new blog post is published on WordPress â†’ Create social media posts with ChatGPT â†’ Schedule in Buffer â†’ Add to content calendar in Google Sheets â†’ Notify team in Slack'",
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
      "transcription",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "One asset â†’ 10+ formats",
    recommendedTools: [
      "castmagic",
      "opusclip",
      "claude",
      "heygen",
      "descript",
    ],
    workflow: {
      description:
        "Transform one content piece into multiple formats",
      steps: [
        "Start with long-form content (podcast episode, webinar, blog post)",
        "For podcast/video: Extract clips with OpusClip, generate blog post with Castmagic",
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
  {
    id: "track-marketing-analytics",
    title: "Track and Understand Marketing Analytics",
    description:
      "Set up analytics to understand what content is working, where traffic comes from, and how visitors behave on your website. Make data-driven decisions to improve your marketing.",
    category: "automation",
    tags: [
      "analytics",
      "data",
      "tracking",
      "metrics",
      "performance",
      "insights",
      "reporting",
      "website analytics",
      "traffic",
      "conversions",
      "heatmaps",
      "dashboard",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "1-2 hours to set up",
    recommendedTools: [
      "google-analytics-4",
      "hotjar",
      "semrush",
      "hubspot-ai",
    ],
    workflow: {
      description: "Set up analytics and start making data-driven marketing decisions",
      steps: [
        "Install Google Analytics 4 on your website (free — tracks all traffic)",
        "Set up Hotjar to see heatmaps and session recordings",
        "Connect GA4 to Google Search Console (see which keywords bring traffic)",
        "Set up conversion goals in GA4 (form submissions, button clicks, purchases)",
        "Review weekly: top pages, traffic sources, and drop-off points",
        "Use Semrush to benchmark your SEO performance vs competitors",
      ],
    },
    examplePrompts: [
      "What are the most important metrics I should track for a small business website?",
      "How do I set up conversion tracking in Google Analytics 4 for a contact form?",
      "What does a heatmap tell me about my landing page performance?",
    ],
  },
  {
    id: "build-email-newsletter",
    title: "Build and Grow an Email Newsletter",
    description:
      "Start and grow an email newsletter to build an owned audience you control. Use AI to write content, grow subscribers, and monetize your list.",
    category: "automation",
    tags: [
      "email",
      "newsletter",
      "email marketing",
      "subscribers",
      "audience",
      "list building",
      "email list",
      "campaigns",
      "monetize",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "1 week to launch",
    recommendedTools: [
      "beehiiv",
      "kit-convertkit",
      "mailchimp",
      "chatgpt",
      "claude",
    ],
    workflow: {
      description: "Launch and grow an email newsletter from zero",
      steps: [
        "Choose your platform: Beehiiv (newsletter-first) or Kit (creator automation)",
        "Define your newsletter topic and cadence (weekly is ideal to start)",
        "Write your first 3 issues with ChatGPT or Claude before launching",
        "Set up a welcome sequence (3-email automated series for new subscribers)",
        "Add a signup form or landing page to your website",
        "Promote on social media and in your email signature",
      ],
    },
    examplePrompts: [
      "Write a welcome email for new subscribers to my [topic] newsletter. Warm, friendly tone.",
      "Create a 3-email welcome sequence for a newsletter about AI tools for small businesses.",
      "Write this week's newsletter issue about [topic] in a conversational style. 400 words.",
    ],
  },
  {
    id: "run-social-media-ads",
    title: "Create and Run Social Media Ads",
    description:
      "Design and launch AI-powered ad campaigns on Facebook, Instagram, and LinkedIn without a designer or agency. Use AI to generate ad creatives, copy, and targeting strategies.",
    category: "automation",
    tags: [
      "ads",
      "advertising",
      "social media ads",
      "facebook ads",
      "instagram ads",
      "linkedin ads",
      "ad creatives",
      "paid social",
      "campaigns",
      "ad copy",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "1-2 days to launch",
    recommendedTools: [
      "adcreative-ai",
      "canva-ai",
      "chatgpt",
      "claude",
      "predis-ai",
    ],
    workflow: {
      description: "AI-powered social media ad creation and launch workflow",
      steps: [
        "Define your campaign goal (awareness, leads, sales) and target audience",
        "Generate ad creative variations with AdCreative.ai",
        "Write 3-5 ad copy variations with ChatGPT (different hooks and CTAs)",
        "Use Creative Scoring AI to predict which ad will perform best",
        "Set up your campaign in Facebook/Instagram Ads Manager or LinkedIn",
        "Monitor performance weekly and pause underperforming ads",
      ],
    },
    examplePrompts: [
      "Write 5 Facebook ad headlines for [product/service] targeting [audience]. Each under 40 characters.",
      "Create 3 ad copy variations for an Instagram ad promoting [offer]. Include hook, body, and CTA.",
      "Write a LinkedIn ad for a B2B service targeting [job title] at [company size] companies.",
    ],
  },

  {
    id: "create-music-for-content",
    title: "Create Music for Your Content",
    description:
      "Generate custom, royalty-free background music, jingles, and audio branding for your videos, podcasts, ads, and social media content — no music experience required.",
    category: "audio-marketing",
    tags: [
      "music",
      "ai music",
      "background music",
      "music creation",
      "jingle",
      "audio branding",
      "royalty free",
      "podcast music",
      "video music",
      "social media music",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per track",
    recommendedTools: [
      "suno",
      "elevenlabs",
      "beatoven-ai",
      "udio",
      "anymelo",
      "adobe-audio",
    ],
    workflow: {
      description: "Generate custom music for any content format",
      steps: [
        "Define the mood and use case (background video music, podcast intro, ad jingle)",
        "Choose your tool: Suno/Udio for full songs, Beatoven for mood-matched video music, ElevenLabs Music for commercial ad use",
        "Write a detailed prompt: genre, mood, tempo, instruments, reference style",
        "Generate 2-3 variations and pick the best",
        "Download in MP3 or WAV — all commercially cleared on paid plans",
        "Add to your video, podcast, or ad in your editing tool",
      ],
    },
    examplePrompts: [
      "Create an upbeat, energetic background track for a 60-second product demo video. Modern pop, no lyrics, builds to a climax at the end.",
      "Generate a warm, professional podcast intro jingle. 15 seconds, acoustic guitar, friendly and approachable tone.",
      "Create a catchy jingle for a local bakery ad. Upbeat, fun, with a sing-along quality. 30 seconds.",
    ],
  },
  {
    id: "create-professional-headshots",
    title: "Create Professional Headshots and Product Photos",
    description:
      "Generate professional-quality headshots, product photography, and branded visual assets from a single photo — without hiring a photographer or renting a studio.",
    category: "content-marketing",
    tags: [
      "headshots",
      "product photography",
      "ai photos",
      "personal branding",
      "professional photos",
      "brand photos",
      "photo studio",
      "portrait",
      "visual content",
      "marketing photos",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per photo set",
    recommendedTools: [
      "sceneyou",
      "leonardo-ai",
      "midjourney",
      "canva-ai",
    ],
    workflow: {
      description: "Generate professional photos without a photographer",
      steps: [
        "Upload one clear, well-lit photo of yourself or your product",
        "Choose your use case: headshots (SceneYou), product shots (Leonardo AI), brand visuals (Midjourney)",
        "Select from 1,000+ templates or write a custom scene description",
        "Generate variations — get 20+ professional options in minutes",
        "Download your favorites and use across LinkedIn, website, social media",
        "Add text or brand elements with Canva AI if needed",
      ],
    },
    examplePrompts: [
      "Generate 10 professional LinkedIn headshot variations of me in different business settings — office, outdoor, studio.",
      "Create product lifestyle shots of [product] in a modern kitchen setting. Photorealistic, natural lighting.",
      "Generate a professional brand photo of me for my website hero section. Confident, approachable, modern background.",
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
  "transcription": ["transcription", "podcast", "video"],
  "transcribe": ["transcription", "podcast", "video"],
  "meeting notes": ["transcription"],
  "speech to text": ["transcription", "voice"],
  "captions": ["transcription", "video", "captions"],
  "subtitles": ["transcription", "video"],
  "podcast": ["podcast", "audio"],
  "create podcast": ["podcast", "audio"],
  "launch podcast": ["podcast", "audio"],
  "start podcast": ["podcast", "audio"],
  "grow podcast": ["podcast", "audio"],
  "record podcast": ["podcast", "audio"],
  "podcast editing": ["podcast", "audio"],
  "video": ["video"],
  "create video": ["video"],
  "video editing": ["video", "editing"],
  "edit video": ["video", "editing"],
  "video production": ["video", "production"],
  "make video": ["video"],
  "video content": ["video"],
  "youtube": ["video", "youtube"],
  "reels": ["video", "social"],
  "tiktok video": ["video", "social"],
  "short video": ["video", "social"],
  "video marketing": ["video"],
  "avatar": ["avatar"],
  "create avatar": ["avatar"],
  "personal avatar": ["avatar"],
  "ai avatar": ["avatar"],
  "digital human": ["avatar"],
  "talking head": ["avatar", "video"],
  "no camera video": ["avatar"],
  "writing": ["writing", "content", "blog"],
  "writing assistant": ["writing", "content", "blog"],
  "blog writing": ["blog", "writing", "content"],
  "content writing": ["writing", "content", "blog"],
  "blog": ["blog", "writing", "content"],
  "article": ["blog", "writing", "content"],
  "content creation": ["writing", "content", "blog"],
  "copywriting": ["writing", "content"],
  "blog post": ["blog", "writing", "content"],
  "write content": ["writing", "content", "blog"],
  "content faster": ["writing", "content", "blog"],
  "voiceover": ["voice", "audio", "narration"],
  "voice over": ["voice", "audio", "narration"],
  "voice cloning": ["voice", "audio"],
  "create voiceover": ["voice", "audio", "narration"],
  "voice": ["voice", "audio", "narration"],
  "text to speech": ["voice", "audio"],
  "tts": ["voice", "audio"],
  "narration": ["voice", "audio", "narration"],
  "audio content": ["voice", "audio"],
  "music": ["audio", "music"],
  "background music": ["audio", "music"],
  "music creation": ["music", "ai music", "music creation"],
  "ai music": ["music", "ai music", "music creation"],
  "create music": ["music", "ai music", "music creation"],
  "make music": ["music", "ai music", "music creation"],
  "music for video": ["music", "video"],
  "music for podcast": ["music", "podcast", "audio"],
  "background track": ["music", "audio"],
  "headshots": ["headshots", "product photography", "personal branding"],
  "product photography": ["headshots", "product photography"],
  "product photos": ["headshots", "product photography"],
  "professional photos": ["headshots", "personal branding"],
  "personal branding photos": ["headshots", "personal branding"],
  "vibe coding": ["automation", "no-code"],
  "build an app": ["automation", "no-code"],
  "jingle": ["audio", "music"],
  "images": ["images", "graphics", "visual"],
  "create images": ["images", "graphics", "visual"],
  "ai images": ["images", "graphics", "visual"],
  "generate images": ["images", "graphics", "visual"],
  "graphics": ["images", "graphics", "visual", "design"],
  "design": ["images", "graphics", "visual", "design"],
  "visual content": ["images", "graphics", "visual"],
  "ad creatives": ["ads", "images", "graphics"],
  "banner": ["images", "graphics", "ads"],
  "social graphics": ["images", "graphics", "social"],
  "social media": ["social"],
  "social content": ["social"],
  "social": ["social", "instagram", "linkedin", "twitter"],
  "instagram": ["social", "instagram"],
  "linkedin": ["social", "linkedin"],
  "twitter": ["social"],
  "facebook": ["social"],
  "tiktok": ["social", "video"],
  "scheduling": ["social", "scheduling"],
  "social scheduling": ["social", "scheduling"],
  "post scheduling": ["social", "scheduling"],
  "social media management": ["social", "scheduling"],
  "content calendar": ["social", "content"],
  "seo": ["seo", "search", "optimization"],
  "search optimization": ["seo"],
  "keyword research": ["seo", "keywords"],
  "rank higher": ["seo", "rankings"],
  "google ranking": ["seo", "rankings"],
  "search ranking": ["seo", "rankings"],
  "backlinks": ["seo"],
  "site audit": ["seo"],
  "competitor seo": ["seo", "competitors"],
  "email": ["email", "campaigns", "newsletters"],
  "email marketing": ["email", "campaigns"],
  "email campaigns": ["email", "campaigns"],
  "newsletter": ["newsletter", "email"],
  "email list": ["email", "newsletter"],
  "email automation": ["email", "automation"],
  "email sequence": ["email", "automation"],
  "build newsletter": ["newsletter", "email"],
  "grow email list": ["newsletter", "email"],
  "analytics": ["analytics", "data", "tracking", "metrics"],
  "data": ["analytics", "data", "metrics"],
  "tracking": ["analytics", "tracking"],
  "metrics": ["analytics", "metrics"],
  "website analytics": ["analytics", "tracking"],
  "measure": ["analytics", "metrics"],
  "performance": ["analytics", "performance"],
  "reporting": ["analytics", "reporting"],
  "heatmap": ["analytics", "heatmaps"],
  "conversions": ["analytics", "conversions"],
  "traffic": ["analytics", "traffic", "seo"],
  "google analytics": ["analytics", "tracking"],
  "ga4": ["analytics", "tracking"],
  "ads": ["ads", "advertising"],
  "advertising": ["ads", "advertising"],
  "facebook ads": ["ads", "facebook"],
  "instagram ads": ["ads", "instagram"],
  "linkedin ads": ["ads", "linkedin"],
  "paid social": ["ads", "social"],
  "ad copy": ["ads", "copywriting"],
  "run ads": ["ads", "advertising"],
  "ad campaign": ["ads", "advertising"],
  "automation": ["automation", "workflows"],
  "workflow": ["automation", "workflows"],
  "automate": ["automation", "workflows"],
  "no code": ["automation", "no-code"],
  "app builder": ["automation", "no-code"],
  "build app": ["automation", "no-code"],
  "research": ["research", "analysis"],
  "competitive research": ["research", "competitors"],
  "competitor analysis": ["research", "competitors"],
  "content research": ["research", "content"],
  "industry research": ["research", "trends"],
  "repurpose": ["repurposing", "content"],
  "repurposing": ["repurposing", "content"],
  "content repurposing": ["repurposing", "content"],
  "repurpose content": ["repurposing", "content"],
  "recycle content": ["repurposing", "content"],
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
  
  // Final fallback: simple word match (but very permissive)
  return MARKETING_GOALS.filter((goal) => {
    const goalText = `${goal.title} ${goal.description} ${goal.tags.join(" ")}`.toLowerCase();
    return goalText.includes(lowerKeyword);
  });
}
