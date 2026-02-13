import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, Code, Copy, Check, Trash2 } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/data/Badge';
import { useWidgets, useWidgetMutations } from '@/api/hooks/useWidgets';
import type { Widget } from '@/api/types';

export function WidgetsList() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useWidgets({ page });
  const { remove, isDeleting } = useWidgetMutations();

  const handleDelete = async (id: string) => {
    if (confirm(t('widgets.confirmDelete'))) {
      await remove(id);
    }
  };

  return (
    <PageContainer
      title={t('widgets.title')}
      action={
        <Link to="/widgets/new">
          <Button variant="primary">
            <Plus size={16} className="mr-2" />
            {t('widgets.create')}
          </Button>
        </Link>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amply-teal" />
        </div>
      ) : !data?.items.length ? (
        <GlassCard className="text-center py-12">
          <Code size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
          <p className="text-[var(--text-muted)] mb-4">{t('widgets.empty')}</p>
          <Link to="/widgets/new">
            <Button variant="primary">{t('widgets.createFirst')}</Button>
          </Link>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {data.items.map((widget) => (
            <WidgetCard key={widget.id} widget={widget} onDelete={handleDelete} isDeleting={isDeleting} />
          ))}

          {/* Pagination */}
          {data.total > 20 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                {t('common.previous')}
              </Button>
              <span className="flex items-center px-3 text-sm text-[var(--text-secondary)]">
                {page} / {Math.ceil(data.total / 20)}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data.has_more}
              >
                {t('common.next')}
              </Button>
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
}

function WidgetCard({
  widget,
  onDelete,
  isDeleting,
}: {
  widget: Widget;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmbed = () => {
    navigator.clipboard.writeText(widget.embed_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[var(--text-primary)]">{widget.name}</h3>
            <Badge variant={widget.is_active ? 'success' : 'default'}>
              {widget.is_active ? t('widgets.active') : t('widgets.inactive')}
            </Badge>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            {t(`widgets.types.${widget.type}`)} · {widget.embed_count} {t('widgets.embeds')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={copyEmbed}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="ml-1">{copied ? t('common.copied') : t('widgets.copyCode')}</span>
          </Button>
          <Link to={`/widgets/${widget.id}/edit`}>
            <Button variant="secondary" size="sm">{t('common.edit')}</Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(widget.id)}
            disabled={isDeleting}
          >
            <Trash2 size={14} className="text-red-500" />
          </Button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-[var(--surface-secondary)] rounded-lg">
        <code className="text-xs text-[var(--text-muted)] break-all">{widget.embed_code}</code>
      </div>
    </GlassCard>
  );
}
