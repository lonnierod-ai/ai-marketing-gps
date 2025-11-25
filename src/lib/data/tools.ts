import { AITool } from "@/types";

/**
 * AI Tools Database
 * Extracted from Q'dUp Content Marketing Agency's AI Toolkit (November 2025)
 * All descriptions, use cases, and tips are verbatim from the source documentation
 */

export const AI_TOOLS: AITool[] = [
  // ========================================
  // CONTENT CREATION TOOLS
  // ========================================
  {
    id: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    category: "content-creation",
    description: "Conversational AI assistant for writing blog posts, brainstorming content ideas, drafting social media captions, creating video scripts, answering questions, and assisting with research.",
    bestFor: [
      "Blog content ideation",
      "Outline creation",
      "First drafts",
      "Email copywriting",
      "Social media content",
      "Content strategy brainstorming",
    ],
    proTip: "Use ChatGPT to generate multiple content angles for a single topic, then refine the best approach. Excellent for overcoming writer's block.",
    tags: ["writing", "content", "blog", "social media", "brainstorming", "research", "llm"],
    relatedTools: ["claude", "jasper-ai", "copy-ai"],
    url: "https://chat.openai.com",
    lastUpdated: "November 2025",
  },
  {
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    category: "content-creation",
    description: "Advanced AI assistant known for nuanced understanding, detailed analysis, and high-quality long-form content creation. Excels at complex research, strategic planning, and maintaining consistent brand voice.",
    bestFor: [
      "Comprehensive blog posts",
      "Content strategy documents",
      "Detailed research analysis",
      "Brand messaging consistency",
      "Complex content planning",
    ],
    proTip: "Claude excels at understanding context and maintaining brand voice across multiple content pieces. Ideal for content series and strategies.",
    tags: ["writing", "content", "strategy", "research", "long-form", "brand voice", "llm"],
    relatedTools: ["chatgpt", "jasper-ai", "notebooklm"],
    url: "https://claude.ai",
    lastUpdated: "November 2025",
  },
  {
    id: "jasper-ai",
    name: "Jasper AI",
    vendor: "Jasper",
    category: "content-creation",
    description: "Marketing-focused AI writing assistant with pre-built templates for blog posts, ad copy, social media content, email campaigns, and more. Designed specifically for content marketers with SEO optimization features.",
    bestFor: [
      "Teams needing consistent brand voice across multiple content formats",
      "Agencies managing multiple clients",
      "SMBs scaling content production quickly",
    ],
    proTip: "Jasper's brand voice feature helps maintain consistency. Train it with your existing content to match your unique style.",
    tags: ["writing", "marketing", "seo", "templates", "brand voice", "agency"],
    relatedTools: ["chatgpt", "claude", "copy-ai"],
    url: "https://www.jasper.ai",
    lastUpdated: "November 2025",
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    vendor: "Copy.ai",
    category: "content-creation",
    description: "AI copywriting tool specializing in short-form content like social media posts, ad headlines, product descriptions, email subject lines, and marketing copy.",
    bestFor: [
      "Social media managers",
      "E-commerce businesses",
      "Marketing teams needing high volumes of short-form copy variations quickly",
    ],
    tags: ["copywriting", "social media", "ads", "short-form", "e-commerce"],
    relatedTools: ["jasper-ai", "chatgpt"],
    url: "https://www.copy.ai",
    lastUpdated: "November 2025",
  },
  {
    id: "grammarly",
    name: "Grammarly",
    vendor: "Grammarly",
    category: "content-creation",
    description: "AI-powered writing assistant that checks grammar, spelling, punctuation, tone, clarity, and engagement. Goes beyond basic spellcheck to improve overall content quality.",
    bestFor: [
      "Polishing all written content before publication",
      "Ensuring professional quality",
      "Maintaining brand tone consistency",
      "Improving readability",
    ],
    tags: ["editing", "grammar", "quality", "tone", "proofreading"],
    relatedTools: ["chatgpt", "claude", "jasper-ai"],
    url: "https://www.grammarly.com",
    lastUpdated: "November 2025",
  },
  {
    id: "gemini-3",
    name: "Gemini 3",
    vendor: "Google",
    category: "content-creation",
    description: "Google's flagship AI model with advanced reasoning, multi-step autonomous agents (Gemini Agent), and generative interfaces that create interactive visual simulations instead of plain text. Deeply integrated with Google Search and Workspace.",
    bestFor: [
      "Multi-step content workflows (research → outline → draft → schedule)",
      "Competitive analysis and market/audience research",
      "Automating email and calendar management for busy marketers",
      "Creating interactive educational or explainer content",
      "Pulling data-driven insights from campaign performance and analytics",
    ],
    proTip: "Use Gemini Agent as a 'research + outline intern.' Ask it to: 'Research the top 3 AI content marketing developments this week, summarize the key shifts, create a blog outline, and draft 5 LinkedIn posts based on that outline. Save everything into a new Google Doc in my Drive.' Let it handle the multi-step workflow while you focus on editing and brand voice.",
    features: [
      "Record-high performance on public leaderboards (1500+ Elo on LMArena-class benchmarks)",
      "Gemini Agent: multi-step autonomous task automation (inbox triage, travel planning, calendar workflows)",
      "Generative interfaces: interactive visualizations and simulations instead of just text",
      "Deep Think / advanced reasoning mode for complex, multi-part problems",
      "Real-time web/search integration to avoid training cutoff gaps",
      "Generous free tier via Gemini web and mobile apps for most everyday use cases",
    ],
    tags: [
      "writing",
      "content",
      "research",
      "automation",
      "agents",
      "reasoning",
      "workspace",
      "search-integration",
      "llm",
    ],
    relatedTools: ["chatgpt", "claude", "notebooklm", "google-ai-studio"],
    url: "https://gemini.google.com",
    lastUpdated: "November 2025",
  },

  // ========================================
  // VIDEO GENERATION & EDITING TOOLS
  // ========================================
  {
    id: "sora-2",
    name: "Sora 2",
    vendor: "OpenAI",
    category: "video-generation",
    description: "Social AI video app with physics-aware generation, audio-visual content creation, and identity-verified cameo features. Launched September 2025 with 1M+ iOS downloads in first 5 days.",
    bestFor: [
      "Creating short-form social video content",
      "Physics-accurate animations",
      "Shareable video for platforms like TikTok, Instagram Reels, and YouTube Shorts",
    ],
    proTip: "Sora 2's physics-aware generation means objects move realistically. Game-changer for product demos and explainer videos that need authentic movement.",
    tags: ["video", "ai-generation", "physics-aware", "social media", "short-form"],
    relatedTools: ["google-veo-3", "luma-ray-3", "runway-gen-4"],
    url: "https://sora.com",
    lastUpdated: "November 2025",
  },
  {
    id: "google-veo-3",
    name: "Google Veo 3.1",
    vendor: "Google",
    category: "video-generation",
    description: "Advanced video generation with native audio, extended 30+ second clips, enhanced narrative control, and SynthID watermarking for content authenticity. 275M+ videos generated since launch.",
    bestFor: [
      "Professional video content requiring synchronized audio",
      "Longer narrative sequences",
      "Verifiable AI-generated content with built-in watermarking",
    ],
    proTip: "Veo 3.1's native audio generation eliminates the need for separate soundtrack creation. Describe your scene and get video with perfectly matched sound effects and dialogue.",
    tags: ["video", "ai-generation", "audio", "professional", "watermarking"],
    relatedTools: ["sora-2", "luma-ray-3", "runway-gen-4"],
    url: "https://deepmind.google/technologies/veo/",
    lastUpdated: "November 2025",
  },
  {
    id: "luma-ray-3",
    name: "Luma Ray 3",
    vendor: "Luma Labs",
    category: "video-generation",
    description: "World's first native 16-bit HDR video generation with reasoning capabilities and 5x faster Draft Mode for rapid iteration. Released April 2025.",
    bestFor: [
      "High-quality video production requiring HDR quality",
      "Rapid prototyping workflows",
      "Budget-conscious iterative video creation",
    ],
    proTip: "Use Luma's Draft Mode (5x cheaper) for concept validation and client approvals, then render final versions in full quality. Massive cost savings for iterative projects.",
    tags: ["video", "ai-generation", "hdr", "draft-mode", "cost-effective"],
    relatedTools: ["sora-2", "google-veo-3", "runway-gen-4"],
    url: "https://lumalabs.ai",
    lastUpdated: "November 2025",
  },
  {
    id: "runway-gen-4",
    name: "Runway Gen-4",
    vendor: "Runway AI",
    category: "video-generation",
    description: "Professional video generation with reference-guided character consistency, flexible 2-10 second durations, and third-party model integrations including Veo 3 and Nano Banana.",
    bestFor: [
      "Maintaining consistent characters across video sequences",
      "Flexible video length control",
      "Professional productions requiring specific duration requirements",
    ],
    proTip: "Gen-4's character consistency feature means your brand spokesperson looks identical across all videos. Critical for maintaining professional brand identity.",
    tags: ["video", "ai-generation", "character-consistency", "professional", "branding"],
    relatedTools: ["sora-2", "google-veo-3", "luma-ray-3"],
    url: "https://runwayml.com",
    lastUpdated: "November 2025",
  },
  {
    id: "descript",
    name: "Descript",
    vendor: "Descript",
    category: "video-generation",
    subcategory: "editing",
    description: "AI-powered video and podcast editing that works like a word processor. Edit audio and video by editing the transcript, remove filler words automatically, create AI voice clones, and generate captions.",
    bestFor: [
      "Podcast editing",
      "Video content creation",
      "Repurposing long-form content into clips",
      "Teams without traditional video editing expertise",
    ],
    proTip: "Descript dramatically reduces video editing time. Perfect for SMBs creating regular video or podcast content without a dedicated editor.",
    tags: ["video", "podcast", "editing", "transcription", "voice-cloning", "captions"],
    relatedTools: ["opusclip", "riverside-fm", "castmagic"],
    url: "https://www.descript.com",
    lastUpdated: "November 2025",
  },
  {
    id: "opusclip",
    name: "OpusClip",
    vendor: "Opus",
    category: "video-generation",
    subcategory: "editing",
    description: "AI tool that automatically identifies and extracts the best moments from long-form videos and turns them into short, engaging clips optimized for social media.",
    bestFor: [
      "Repurposing podcast episodes",
      "Webinars",
      "Long videos into TikTok, Instagram Reels, and YouTube Shorts content",
    ],
    proTip: "Essential for maximizing video ROI. One podcast episode can become 10+ social media clips with minimal effort.",
    tags: ["video", "repurposing", "social media", "clips", "automation"],
    relatedTools: ["descript", "castmagic", "riverside-fm"],
    url: "https://www.opus.pro",
    lastUpdated: "November 2025",
  },
  {
    id: "pika-labs",
    name: "Pika Labs",
    vendor: "Pika Labs",
    category: "video-generation",
    description: "Social AI video creation platform with redesigned interface, template browsing, remix capabilities, and community-driven creation features. Updated September 2025.",
    bestFor: [
      "Social video creators",
      "Content remixing",
      "Collaborative video projects",
      "Teams building on community templates",
    ],
    tags: ["video", "social", "templates", "community", "remix"],
    relatedTools: ["sora-2", "runway-gen-4"],
    url: "https://pika.art",
    lastUpdated: "November 2025",
  },

  // ========================================
  // AI AVATARS & DIGITAL HUMANS
  // ========================================
  {
    id: "heygen",
    name: "HeyGen",
    vendor: "HeyGen Technology Limited",
    category: "avatars",
    description: "Leading AI avatar platform with LiveAvatars featuring Veo 3.1/Sora 2 cinematic integration, Video Agent for automated video creation, multilingual playback, and LMS integration. Major October 2025 release.",
    bestFor: [
      "Creating talking-head videos without filming",
      "Multilingual content with lip-synced translations",
      "Scalable video production for training and marketing",
      "LMS-integrated educational content",
    ],
    proTip: "HeyGen's LiveAvatars with Veo 3.1 integration deliver cinema-quality results. Create an entire video training series in multiple languages without ever stepping in front of a camera.",
    tags: ["avatar", "video", "multilingual", "training", "education", "automation"],
    relatedTools: ["synthesia", "elevenlabs", "descript"],
    url: "https://www.heygen.com",
    lastUpdated: "November 2025",
  },
  {
    id: "synthesia",
    name: "Synthesia",
    vendor: "Synthesia Limited",
    category: "avatars",
    description: "AI video platform with 240+ AI avatars, Veo 3 visual integration, PowerPoint-to-video conversion, interactive video features, and support for 140+ languages. Updated October 2025.",
    bestFor: [
      "Converting presentations to engaging videos",
      "Creating multilingual training content",
      "Producing consistent corporate communications",
      "Scaling video production across global teams",
    ],
    proTip: "Synthesia's PowerPoint converter is a game-changer. Turn your existing presentations into professional training videos in minutes.",
    tags: ["avatar", "video", "presentations", "multilingual", "corporate", "training"],
    relatedTools: ["heygen", "elevenlabs"],
    url: "https://www.synthesia.io",
    lastUpdated: "November 2025",
  },

  // ========================================
  // VOICE & AUDIO TOOLS
  // ========================================
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    vendor: "ElevenLabs",
    category: "voice-audio",
    description: "AI voice generation platform with realistic text-to-speech, voice cloning from minutes of audio, 29+ language support, and HIPAA-compliant enterprise features.",
    bestFor: [
      "Podcast intros/outros",
      "Video voiceovers",
      "Audio content localization",
      "Audiobook narration",
      "Creating consistent branded audio content",
    ],
    proTip: "Clone your voice once, then use it across all video and podcast content. Ensures consistency while saving hours of recording time.",
    tags: ["voice", "audio", "tts", "voice-cloning", "multilingual", "podcast"],
    relatedTools: ["descript", "heygen", "synthesia"],
    url: "https://elevenlabs.io",
    lastUpdated: "November 2025",
  },
  {
    id: "adobe-audio",
    name: "Adobe Generate Speech & Soundtrack",
    vendor: "Adobe",
    category: "voice-audio",
    description: "AI audio tools for creating voiceovers and music soundtracks using text prompts. Features 50+ voices in 20+ languages and Mad Libs-style music generation. Beta launched October 2025.",
    bestFor: [
      "Replacing manual voiceover recording",
      "Generating custom background music for videos",
      "Creating multilingual audio content",
      "Rapid audio prototyping",
    ],
    proTip: "Generate custom soundtrack music with prompts like 'upbeat corporate background music with subtle piano.' No royalty concerns, perfectly matched to your content.",
    tags: ["voice", "audio", "music", "soundtrack", "tts", "royalty-free"],
    relatedTools: ["elevenlabs", "descript"],
    url: "https://www.adobe.com/products/firefly.html",
    lastUpdated: "November 2025",
  },

  // ========================================
  // VISUAL CONTENT CREATION TOOLS
  // ========================================
  {
    id: "midjourney",
    name: "Midjourney",
    vendor: "Midjourney",
    category: "visual-content",
    description: "AI image generation platform that creates stunning, artistic images from text descriptions. Known for producing highly aesthetic and creative visuals with unique style.",
    bestFor: [
      "Blog featured images",
      "Social media graphics",
      "Creative concepts",
      "Brand mood boards",
      "Unique visual assets that stand out",
    ],
    tags: ["image", "ai-generation", "creative", "artistic", "visual"],
    relatedTools: ["dall-e-3", "adobe-firefly", "imagen-4"],
    url: "https://www.midjourney.com",
    lastUpdated: "November 2025",
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    vendor: "OpenAI",
    category: "visual-content",
    description: "AI image generator integrated into ChatGPT that creates images from text descriptions. Excellent at following detailed prompts and incorporating text into images.",
    bestFor: [
      "Quick visual content creation",
      "Social media images with text",
      "Product mockups",
      "Iterative visual brainstorming",
    ],
    tags: ["image", "ai-generation", "chatgpt", "text-in-image", "mockups"],
    relatedTools: ["midjourney", "adobe-firefly", "canva-ai"],
    url: "https://openai.com/dall-e-3",
    lastUpdated: "November 2025",
  },
  {
    id: "canva-ai",
    name: "Canva AI",
    vendor: "Canva",
    category: "visual-content",
    description: "Design platform with integrated AI tools for generating images, removing backgrounds, enhancing photos, creating presentations, and designing social media graphics.",
    bestFor: [
      "Non-designers creating professional graphics",
      "Social media content templates",
      "Presentation design",
      "Maintaining brand consistency",
    ],
    proTip: "Canva's Brand Kit + AI tools = fast, on-brand content at scale. Perfect for SMBs without dedicated design resources.",
    tags: ["design", "graphics", "social media", "templates", "brand-kit", "presentations"],
    relatedTools: ["adobe-firefly", "dall-e-3"],
    url: "https://www.canva.com",
    lastUpdated: "November 2025",
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    vendor: "Adobe",
    category: "visual-content",
    description: "Adobe's generative AI integrated into Creative Cloud apps. Generate images, create text effects, extend images beyond borders, and recolor artwork. Trained on licensed content for commercial safety.",
    bestFor: [
      "Professional designers enhancing workflows",
      "Creating custom visual assets",
      "Teams using Adobe Creative Cloud",
      "Ensuring commercially safe AI content",
    ],
    tags: ["image", "ai-generation", "adobe", "commercial-safe", "professional"],
    relatedTools: ["midjourney", "canva-ai", "imagen-4"],
    url: "https://www.adobe.com/products/firefly.html",
    lastUpdated: "November 2025",
  },
  {
    id: "imagen-4",
    name: "Imagen 4",
    vendor: "Google",
    category: "visual-content",
    description: "Google's latest native image generation model with improved detail, better text rendering, and high-quality output. Available in Gemini app with subscriber benefits.",
    bestFor: [
      "High-quality marketing visuals",
      "Detailed product images",
      "Accurate text-in-image generation",
      "Professional brand assets",
    ],
    tags: ["image", "ai-generation", "google", "high-quality", "text-rendering"],
    relatedTools: ["midjourney", "dall-e-3", "adobe-firefly"],
    url: "https://deepmind.google/technologies/imagen-3/",
    lastUpdated: "November 2025",
  },
  {
    id: "nano-banana-pro",
    name: "Nano Banana Pro",
    vendor: "Google",
    category: "visual-content",
    description: "Google's new image-generation system designed to solve the 'text in images' problem. Generates studio-quality visuals with readable, accurate text in 100+ languages, grounded in real Search data, and supports 1K–4K resolutions across multiple aspect ratios.",
    bestFor: [
      "Social media graphics with embedded text (Instagram carousels, LinkedIn posts, YouTube thumbnails)",
      "Infographics and data visualizations grounded in real, current stats",
      "Multilingual campaign assets (English + Spanish, or other combinations)",
      "Marketing collateral: ad creatives, email headers, slide decks",
      "Upscaling existing 1K assets into 4K for print or high-res web use",
    ],
    proTip: "Upload your brand logo, color palette, and a small set of 'on-brand' social posts as reference images. Then prompt: 'Create 20 Instagram carousel posts about [TOPIC] that match this style, with accurate English + Spanish text and layouts ready to post.' Nano Banana Pro can keep style consistent while handling multilingual typography and layouts.",
    features: [
      "Very strong text rendering in images across many languages",
      "Search-grounded data for stats, recipes, sports scores, etc., to avoid hallucinated numbers",
      "Ability to use multiple reference images to maintain brand/character consistency",
      "Multi-resolution outputs optimized for stories (9:16), feeds (1:1), and landscape (16:9)",
      "Built-in upscaler to enhance low-res images up to 4K",
      "Controls for camera angle, lighting, depth of field, and color grading",
    ],
    tags: [
      "image",
      "ai-generation",
      "google",
      "text-in-image",
      "multilingual",
      "social-media",
      "branding",
      "infographics",
      "upscaling",
    ],
    relatedTools: ["midjourney", "dall-e-3", "imagen-4", "canva-ai"],
    url: "https://gemini.google.com",
    lastUpdated: "November 2025",
  },

  // ========================================
  // VIBE CODING & NO-CODE DEVELOPMENT
  // ========================================
  {
    id: "google-ai-studio",
    name: "Google AI Studio",
    vendor: "Google",
    category: "vibe-coding",
    description: "Browser-based AI development platform with new vibe coding experience (launched November 2025). Describe multimodal apps in natural language and AI Studio automatically wires up Gemini, Veo 3.1, text-to-speech, and other Google AI models. Features unified playground, annotation mode for visual editing, and one-click deployment to Cloud Run.",
    bestFor: [
      "Building AI-powered apps without coding",
      "Rapid prototyping of content tools",
      "Combining multiple AI capabilities (video, audio, text, images) in single workflow",
      "Learning AI development through experimentation",
    ],
    proTip: "AI Studio's 'I'm Feeling Lucky' button and App Gallery provide instant inspiration. Describe 'a content calendar that analyzes competitor posts' and watch AI build it. Free tier perfect for SMB experimentation.",
    tags: ["no-code", "development", "multimodal", "prototyping", "automation"],
    relatedTools: ["chatgpt", "claude"],
    url: "https://aistudio.google.com",
    lastUpdated: "November 2025",
  },

  // ========================================
  // RESEARCH & SEO TOOLS
  // ========================================
  {
    id: "notebooklm",
    name: "NotebookLM",
    vendor: "Google",
    category: "research-seo",
    description: "Google's AI research assistant built around 'notebooks.' With Deep Research enabled, it can take a question, design a research plan, search across many sources, read your uploaded documents, and return structured, source-cited summaries and reports. It's designed to replace many paid research tools for content marketers, consultants, and analysts.",
    bestFor: [
      "Competitive analysis (upload competitor websites, sales pages, and content)",
      "Research for blog posts, whitepapers, and reports (collect stats, quotes, frameworks)",
      "Customer insight mining (analyzing surveys, call transcripts, support tickets)",
      "Campaign and funnel analysis using Google Sheets and exported data",
      "Weekly or monthly 'industry intelligence' briefs on AI + marketing trends",
    ],
    proTip: "Create a 'Competitor Intelligence' notebook, then add links or documents for 5–10 competitors (sites, blogs, landing pages, and social posts). Ask Deep Research: 'What content topics and angles are my competitors focusing on that I'm ignoring? What gaps or 'white space' opportunities can I address instead?' NotebookLM will synthesize patterns, cite specific examples, and give you a consultant-level analysis you can turn directly into a content strategy.",
    features: [
      "100% free to use (no subscription required at this time)",
      "Deep Research mode: multi-step research with many sources and automatic planning",
      "Fast Research mode for quick checks and surface-level answers",
      "Multi-format support: Google Docs, Sheets, Drive URLs, PDFs, web pages, etc.",
      "Audio overviews that turn research summaries into listenable 'mini podcasts'",
      "Strong citation support so claims are easy to trace back to original sources",
      "Tight integration with the Google ecosystem (Docs, Sheets, Drive)",
    ],
    tags: [
      "research",
      "analysis",
      "deep-research",
      "competitive-intelligence",
      "documents",
      "synthesis",
      "citations",
      "free",
    ],
    relatedTools: ["perplexity-ai", "claude", "marketmuse", "gemini-3"],
    url: "https://notebooklm.google.com",
    lastUpdated: "November 2025",
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI",
    vendor: "Perplexity",
    category: "research-seo",
    description: "AI-powered research and answer engine that provides sourced, cited answers to questions. Combines search engine capabilities with conversational AI.",
    bestFor: [
      "Content research",
      "Fact-checking",
      "Competitive analysis",
      "Industry trend research",
      "Gathering up-to-date information with verifiable sources",
    ],
    proTip: "Essential for blog research. Perplexity provides citations, making fact-checking effortless and dramatically speeding up research.",
    tags: ["research", "search", "citations", "fact-checking", "trends"],
    relatedTools: ["notebooklm", "chatgpt", "claude"],
    url: "https://www.perplexity.ai",
    lastUpdated: "November 2025",
  },
  {
    id: "surfer-seo",
    name: "Surfer SEO",
    vendor: "Surfer",
    category: "research-seo",
    description: "AI-powered SEO content optimization platform that analyzes top-ranking content and provides data-driven recommendations for improving search rankings.",
    bestFor: [
      "Optimizing blog posts for search engines",
      "Competitive content analysis",
      "Keyword strategy",
      "Ensuring content meets SEO best practices",
    ],
    tags: ["seo", "optimization", "keywords", "ranking", "analysis"],
    relatedTools: ["clearscope", "marketmuse", "chatgpt"],
    url: "https://surferseo.com",
    lastUpdated: "November 2025",
  },
  {
    id: "clearscope",
    name: "Clearscope",
    vendor: "Clearscope",
    category: "research-seo",
    description: "AI content optimization platform that helps writers create highly relevant, comprehensive content that ranks well. Provides real-time content grading.",
    bestFor: [
      "Enterprise content teams",
      "SEO-focused content creation",
      "Ensuring content comprehensiveness without keyword stuffing",
    ],
    tags: ["seo", "optimization", "content-grading", "relevance"],
    relatedTools: ["surfer-seo", "marketmuse"],
    url: "https://www.clearscope.io",
    lastUpdated: "November 2025",
  },
  {
    id: "marketmuse",
    name: "MarketMuse",
    vendor: "MarketMuse",
    category: "research-seo",
    description: "AI-powered content research and planning platform that analyzes content gaps, suggests topics, and provides data-driven content briefs.",
    bestFor: [
      "Content strategy planning",
      "Identifying content opportunities",
      "Competitive gap analysis",
      "Building topical authority in niches",
    ],
    tags: ["seo", "strategy", "content-gaps", "planning", "briefs"],
    relatedTools: ["surfer-seo", "clearscope", "notebooklm"],
    url: "https://www.marketmuse.com",
    lastUpdated: "November 2025",
  },

  // ========================================
  // SOCIAL MEDIA & PRODUCTIVITY TOOLS
  // ========================================
  {
    id: "buffer-ai",
    name: "Buffer AI Assistant",
    vendor: "Buffer",
    category: "social-productivity",
    description: "Social media management platform with integrated AI for content creation, optimal posting times, and performance analytics.",
    bestFor: [
      "Managing multiple social media accounts",
      "Scheduling posts",
      "Analyzing performance",
      "Maintaining consistent social presence",
    ],
    tags: ["social-media", "scheduling", "analytics", "management"],
    relatedTools: ["hootsuite", "copy-ai", "chatgpt"],
    url: "https://buffer.com",
    lastUpdated: "November 2025",
  },
  {
    id: "hootsuite",
    name: "Hootsuite Insights",
    vendor: "Hootsuite",
    category: "social-productivity",
    description: "Social listening and analytics platform using AI to track brand mentions, analyze sentiment, identify trends, and provide actionable insights.",
    bestFor: [
      "Brand monitoring",
      "Competitive analysis",
      "Crisis management",
      "Understanding audience sentiment and preferences",
    ],
    tags: ["social-media", "listening", "sentiment", "monitoring", "analytics"],
    relatedTools: ["buffer-ai", "hubspot-ai"],
    url: "https://www.hootsuite.com",
    lastUpdated: "November 2025",
  },
  {
    id: "notion-ai",
    name: "Notion AI 3.0 Agents",
    vendor: "Notion Labs",
    category: "social-productivity",
    description: "Autonomous AI agents with 20+ minute task execution capability across hundreds of pages. Cross-platform knowledge work integration with Slack, Drive, and Figma. Released September 2025.",
    bestFor: [
      "Automated weekly competitor analysis",
      "Content calendar management",
      "Cross-platform search and synthesis",
      "Multi-step workflow automation",
    ],
    proTip: "Notion AI Agents can handle complex research tasks like 'compile all competitor blog posts from last month, analyze common themes, and suggest content gaps.' Runs autonomously while you work on other priorities.",
    tags: ["productivity", "automation", "research", "workflow", "agents"],
    relatedTools: ["zapier", "chatgpt"],
    url: "https://www.notion.so",
    lastUpdated: "November 2025",
  },

  // ========================================
  // PODCAST PRODUCTION TOOLS
  // ========================================
  {
    id: "riverside-fm",
    name: "Riverside.fm",
    vendor: "Riverside",
    category: "podcast-production",
    description: "Podcast and video recording platform with AI-powered transcription, editing, clip creation, and show note generation. Records locally for studio-quality audio.",
    bestFor: [
      "Remote podcast interviews",
      "Video podcasts",
      "Automated transcription",
      "Creating social media clips from podcast episodes",
    ],
    proTip: "Riverside's AI Editor dramatically reduces post-production time. Perfect for maintaining consistent podcast publication schedules.",
    tags: ["podcast", "recording", "transcription", "video", "remote"],
    relatedTools: ["descript", "castmagic", "opusclip"],
    url: "https://riverside.fm",
    lastUpdated: "November 2025",
  },
  {
    id: "castmagic",
    name: "Castmagic",
    vendor: "Castmagic",
    category: "podcast-production",
    description: "AI tool that transforms podcast audio into multiple content formats: show notes, social posts, blog articles, email newsletters, video clips, and more.",
    bestFor: [
      "Maximizing podcast ROI through content repurposing",
      "Creating comprehensive marketing campaigns from episodes",
      "Scaling content production",
    ],
    tags: ["podcast", "repurposing", "content", "automation", "marketing"],
    relatedTools: ["riverside-fm", "descript", "opusclip"],
    url: "https://www.castmagic.io",
    lastUpdated: "November 2025",
  },
  {
    id: "podcastle",
    name: "Podcastle",
    vendor: "Podcastle",
    category: "podcast-production",
    description: "AI-powered podcast creation platform with recording, editing, transcription, and enhancement tools. Features Magic Dust AI for automatic audio quality improvement.",
    bestFor: [
      "Podcast creators needing all-in-one solution",
      "Audio quality enhancement",
      "Teams without dedicated audio engineers",
    ],
    tags: ["podcast", "recording", "editing", "audio-enhancement", "all-in-one"],
    relatedTools: ["riverside-fm", "descript"],
    url: "https://podcastle.ai",
    lastUpdated: "November 2025",
  },

  // ========================================
  // MARKETING AUTOMATION & DISTRIBUTION
  // ========================================
  {
    id: "hubspot-ai",
    name: "HubSpot Marketing Hub",
    vendor: "HubSpot",
    category: "marketing-automation",
    description: "All-in-one CRM, email marketing, social scheduling, landing pages, and workflows with integrated AI content assistant. AI features: content generation, smart CRM contact enrichment, AI campaigns (auto-test subject lines), predictive lead scoring, and automated workflows.",
    bestFor: [
      "SMBs scaling from 1-2 person team to 5-10 person team",
      "Need integrated platform instead of juggling Email + CRM + Social + Analytics separately",
    ],
    proTip: "HubSpot's transparent pricing ($800/month) vs Braze's enterprise pricing ($60K/year) makes it ideal for growing SMBs. Use AI Campaigns to automate email optimization—let AI test 100 subject lines while you work on strategy.",
    pricing: "$800+/month (Pro tier with full AI features) | $300/month (Starter with basic AI)",
    tags: ["crm", "email", "automation", "workflows", "lead-scoring", "enterprise"],
    relatedTools: ["mailchimp", "klaviyo", "zapier"],
    url: "https://www.hubspot.com",
    lastUpdated: "November 2025",
  },
  {
    id: "mailchimp",
    name: "Mailchimp AI",
    vendor: "Intuit Mailchimp",
    category: "marketing-automation",
    description: "AI-powered email marketing with send-time optimization, subject line suggestions, smart audience segmentation, and campaign automation. Start free ($13/month after free tier).",
    bestFor: [
      "General marketing emails",
      "Newsletters",
      "Welcome sequences",
      "Blogs",
      "B2B",
    ],
    proTip: "Both platforms now offer AI campaign generators. Describe your goal in plain English. AI suggests copy, segment, and send strategy. Saves 2-3 hours per campaign.",
    pricing: "Free tier (up to 500 contacts) | $13-50/month",
    tags: ["email", "marketing", "newsletters", "automation", "b2b"],
    relatedTools: ["klaviyo", "hubspot-ai"],
    url: "https://mailchimp.com",
    lastUpdated: "November 2025",
  },
  {
    id: "klaviyo",
    name: "Klaviyo AI",
    vendor: "Klaviyo",
    category: "marketing-automation",
    description: "E-commerce email + SMS platform with predictive analytics, abandoned cart flows, product recommendations, and customer lifetime value tracking. Start $45/month.",
    bestFor: [
      "E-commerce stores (Shopify, WooCommerce)",
      "Retail",
      "Subscription boxes",
    ],
    pricing: "$45+/month",
    tags: ["email", "sms", "e-commerce", "shopify", "predictive-analytics"],
    relatedTools: ["mailchimp", "hubspot-ai"],
    url: "https://www.klaviyo.com",
    lastUpdated: "November 2025",
  },
  {
    id: "zapier",
    name: "Zapier",
    vendor: "Zapier",
    category: "marketing-automation",
    description: "Connects 7,000+ apps to automate repetitive tasks without coding. Example workflow: ChatGPT generates blog post → Zapier sends to WordPress (auto-publishes) → Slack notification → schedules social posts in Buffer → adds to Google Sheets content calendar. All automatic.",
    bestFor: [
      "Any team saying 'I wish this happened automatically'",
      "Social media managers",
      "Content marketers",
      "E-commerce",
      "Support teams",
    ],
    proTip: "Start with Zapier's template library (search 'content marketing automation'). Most common workflows already exist—just customize. Template 'ChatGPT blog post to WordPress' takes 5 minutes to set up.",
    pricing: "$20-50/month (2-5 person teams) | Free tier (2 tasks/month)",
    tags: ["automation", "workflows", "integration", "no-code", "productivity"],
    relatedTools: ["notion-ai", "hubspot-ai", "google-ai-studio"],
    url: "https://zapier.com",
    lastUpdated: "November 2025",
  },

  // ========================================
  // ANALYTICS & INTELLIGENCE
  // ========================================
  {
    id: "google-analytics-4",
    name: "Google Analytics 4",
    vendor: "Google",
    category: "analytics",
    description: "Analytics platform with AI-powered predictive metrics, anomaly detection, and automated insights that surface important trends.",
    bestFor: [
      "Understanding content performance",
      "Tracking conversions",
      "Identifying high-value content",
      "Making data-driven strategy decisions",
    ],
    tags: ["analytics", "metrics", "data", "insights", "tracking"],
    relatedTools: ["hubspot-ai"],
    url: "https://analytics.google.com",
    lastUpdated: "November 2025",
  },
];

/**
 * Get tool by ID
 */
export function getToolById(id: string): AITool | undefined {
  return AI_TOOLS.find((tool) => tool.id === id);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): AITool[] {
  return AI_TOOLS.filter((tool) => tool.category === category);
}

/**
 * Get all tools
 */
export function getAllTools(): AITool[] {
  return AI_TOOLS;
}

/**
 * Search tools by keyword
 */
export function searchTools(keyword: string): AITool[] {
  const lowerKeyword = keyword.toLowerCase();
  return AI_TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerKeyword) ||
      tool.description.toLowerCase().includes(lowerKeyword) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword)) ||
      tool.vendor.toLowerCase().includes(lowerKeyword)
  );
}
