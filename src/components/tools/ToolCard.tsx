import Link from "next/link";
import { AITool } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tool/${tool.id}`}>
      <Card hover className="p-4 sm:p-6 h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-brand-dark">
                {tool.name}
              </h3>
              <Badge variant="default">{tool.vendor}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-brand-dark/60 mt-1">
              {tool.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-brand-dark/80 mb-4 line-clamp-3 flex-grow">
            {tool.description}
          </p>

          {/* Best For - Show first 2 items */}
          {tool.bestFor && tool.bestFor.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-brand-dark/80 uppercase mb-1">
                Best For:
              </p>
              <ul className="text-sm text-brand-dark/70 space-y-1">
                {tool.bestFor.slice(0, 2).map((useCase, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-orange mr-2">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
              {tool.bestFor.length > 2 && (
                <p className="text-xs text-brand-dark/50 mt-1">
                  +{tool.bestFor.length - 2} more...
                </p>
              )}
            </div>
          )}

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {tool.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 4 && (
                <Badge variant="default">+{tool.tags.length - 4}</Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
