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
      "efficiency",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "One long video → 10+ clips in minutes",
    recommendedTools: ["opusclip", "descript", "castmagic"],
    workflow: {
      description:
        "Maximize video ROI by automatically creating social clips",
      steps: [
        "Upload long-form video to OpusClip",
        "AI identifies best moments and creates clips optimized for virality",
        "Review and select clips (OpusClip scores each for viral potential)",
        "Fine-tune clips in Descript if needed (edit by editing transcript)",
        "Export with captions (critical for social media)",
        "Distribute across TikTok, Instagram Reels, YouTube Shorts",
      ],
    },
  },
  {
    id: "video-editing-fast",
    title: "Edit Videos Faster",
    description:
      "Speed up video editing dramatically by editing transcripts instead of timelines. Remove filler words automatically, add captions, and create clips efficiently.",
    category: "video-marketing",
    tags: ["editing", "video", "efficiency", "podcast", "captions", "fast"],
    difficulty: "beginner",
    estimatedTimeframe: "80% faster than traditional editing",
    recommendedTools: ["descript", "opusclip"],
    workflow: {
      description:
        "Revolutionary video editing by editing text, not timelines",
      steps: [
        "Upload video to Descript (auto-transcribes)",
        "Edit transcript like a document (deletions = video cuts)",
        "Remove filler words with one click (um, uh, like)",
        "Add captions automatically",
        "Create clips by selecting text",
        "Export finished video",
      ],
    },
  },

  // ========================================
  // AUDIO MARKETING GOALS
  // ========================================
  {
    id: "launch-podcast",
    title: "Launch a Podcast",
    description:
      "Start a podcast from scratch or improve your existing show. Record, edit, transcribe, and repurpose episodes into multiple content formats.",
    category: "audio-marketing",
    tags: [
      "podcast",
      "audio",
      "launch",
      "recording",
      "interviews",
      "content",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "2-4 weeks to launch",
    recommendedTools: [
      "riverside-fm",
      "descript",
      "castmagic",
      "opusclip",
      "elevenlabs",
    ],
    workflow: {
      description:
        "Complete podcast workflow from recording to multi-channel distribution",
      steps: [
        "Record episodes with Riverside.fm (studio-quality, even remote)",
        "Edit with Descript (edit transcript, remove filler words)",
        "Generate show notes, blog posts, and social content with Castmagic",
        "Create video clips with OpusClip (for YouTube, social media)",
        "Create intro/outro with ElevenLabs (consistent voice)",
        "Distribute to podcast platforms",
      ],
    },
    examplePrompts: [
      "Create a podcast episode outline for an interview with [guest] about [topic]. Include intro, 5 main questions, and outro.",
      "Write engaging show notes for a podcast episode about [topic] that includes timestamps, key takeaways, and resources mentioned.",
    ],
  },
  {
    id: "voice-content",
    title: "Create Voice Content & Voiceovers",
    description:
      "Generate professional voiceovers and audio content without recording. Clone your voice for consistent narration or use AI voices for multilingual content.",
    category: "audio-marketing",
    tags: [
      "voice",
      "audio",
      "voiceover",
      "narration",
      "voice-cloning",
      "multilingual",
    ],
    difficulty: "beginner",
    estimatedTimeframe: "Minutes per voiceover",
    recommendedTools: ["elevenlabs", "descript", "adobe-audio"],
    workflow: {
      description:
        "Professional voiceovers without recording sessions",
      steps: [
        "Clone your voice with ElevenLabs (one-time, 10 minutes of audio)",
        "Write script for voiceover",
        "Generate voiceover with your cloned voice",
        "For multilingual: Generate in 29+ languages with ElevenLabs",
        "Add to videos, podcasts, or standalone audio content",
      ],
    },
    examplePrompts: [
      "Write a 30-second voiceover script for a product demo video about [product].",
      "Create a podcast intro script (15 seconds) that's energetic and welcoming.",
    ],
  },

  // ========================================
  // SOCIAL MEDIA GOALS
  // ========================================
  {
    id: "social-media-content",
    title: "Create Social Media Content at Scale",
    description:
      "Generate high volumes of social media posts, captions, and graphics quickly. Maintain consistent brand voice across platforms.",
    category: "social-media",
      tags: [
    "social media",
    "content",
    "posts",
    "captions",
    "instagram",
    "linkedin",
    "twitter",
    "facebook",
    "writing",
  ],

    difficulty: "beginner",
    estimatedTimeframe: "Weekly batch creation",
    recommendedTools: [
      "copy-ai",
      "chatgpt",
      "canva-ai",
      "buffer-ai",
      "jasper-ai",
    ],
    workflow: {
      description:
        "Efficient social media content creation and scheduling workflow",
      steps: [
        "Generate post ideas with ChatGPT (based on blog content, trends, etc.)",
        "Create multiple caption variations with Copy.ai (short-form specialist)",
        "Design graphics with Canva AI (on-brand templates)",
        "Schedule posts with Buffer AI (optimal timing recommendations)",
        "Monitor performance and adjust",
      ],
    },
    examplePrompts: [
      "Create 10 LinkedIn post ideas about [topic] for [audience]. Include hook and key points for each.",
      "Write 5 caption variations for an Instagram post promoting [product/service]. Include relevant hashtags.",
      "Generate a week's worth of Twitter/X posts about [industry topic]. Keep each under 280 characters.",
    ],
  },
  {
    id: "social-media-management",
    title: "Manage Social Media Efficiently",
    description:
      "Schedule posts, monitor brand mentions, analyze performance, and maintain consistent presence across platforms without overwhelm.",
    category: "social-media",
    tags: [
      "management",
      "scheduling",
      "monitoring",
      "analytics",
      "efficiency",
      "social media",
    ],
    difficulty: "intermediate",
    estimatedTimeframe: "Ongoing",
    recommendedTools: ["buffer-ai", "hootsuite", "notion-ai"],
    workflow: {
      description:
        "Centralized social media management and monitoring",
      steps: [
        "Plan content calendar with Notion AI",
        "Batch create content (see 'Create Social Media Content' goal)",
        "Schedule across platforms with Buffer AI (optimal timing)",
        "Monitor brand mentions with Hootsuite Insights",
        "Analyze sentiment and trends with Hootsuite",
        "Adjust strategy based on AI-powered insights",
      ],
    },
  },

  // ========================================
  // MARKETING AUTOMATION GOALS
  // ========================================
  {
    id: "email-marketing",
    title: "Launch Email Marketing Campaigns",
    description:
      "Create, send, and optimize email campaigns. Use AI to test subject lines, segment audiences, and automate workflows.",
    category: "automation",
      tags: [
    "email",
    "marketing",
    "campaigns",
    "newsletters",
    "automation",
    "segmentation",
    "writing",
  ],

    difficulty: "intermediate",
    estimatedTimeframe: "Ongoing",
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
      "Write a 60-second explainer video script about [topic] for [audience]. Include hook, problem, solution, and CTA.",
      "Turn this blog post into a 90-second video script for YouTube. Make it conversational and engaging.",
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

// Normalize common user phrases to core intent keywords
const KEYWORD_ALIASES: Record<string, string> = {
  "writing assistant": "writing",
  "copywriting": "writing",
  "content writing": "writing",
  "writer": "writing",
  "write": "writing",
};

export function searchGoals(keyword: string): MarketingGoal[] {
  let lowerKeyword = keyword.toLowerCase().trim();

  // Normalize phrases like "writing assistant" → "writing"
  if (KEYWORD_ALIASES[lowerKeyword]) {
    lowerKeyword = KEYWORD_ALIASES[lowerKeyword];
  }

  // Split into individual words (e.g., "writing assistant" → ["writing", "assistant"])
  const words = lowerKeyword.split(/\s+/).filter(Boolean);

  return MARKETING_GOALS.filter((goal) => {
    const text =
      (goal.title + " " + goal.description + " " + goal.tags.join(" "))
        .toLowerCase();

    // Match whole phrase OR any individual word
    return (
      text.includes(lowerKeyword) ||
      words.some((word) => text.includes(word))
    );
  });
}
