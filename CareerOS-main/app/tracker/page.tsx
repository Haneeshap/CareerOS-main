'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import type { Application, ApplicationStatus } from '@/lib/supabase';
import {
  MoreHorizontal,
  Plus,
  DollarSign,
  MapPin,
  Calendar,
  ExternalLink,
  GripVertical,
  BookmarkCheck,
  FileText,
  CalendarDays,
  XCircle,
  Trophy,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const COLUMNS: { id: ApplicationStatus; label: string; icon: React.ElementType; color: string; headerBg: string }[] = [
  { id: 'saved', label: 'Saved', icon: BookmarkCheck, color: 'text-gray-500', headerBg: 'bg-gray-100 dark:bg-gray-800/50' },
  { id: 'applied', label: 'Applied', icon: FileText, color: 'text-blue-500', headerBg: 'bg-blue-50 dark:bg-blue-950/20' },
  { id: 'interview', label: 'Interview', icon: CalendarDays, color: 'text-amber-500', headerBg: 'bg-amber-50 dark:bg-amber-950/20' },
  { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-500', headerBg: 'bg-red-50 dark:bg-red-950/20' },
  { id: 'offer', label: 'Offer', icon: Trophy, color: 'text-emerald-500', headerBg: 'bg-emerald-50 dark:bg-emerald-950/20' },
];

const statusColors: Record<ApplicationStatus, string> = {
  saved: 'text-gray-600 bg-gray-100 dark:bg-gray-800',
  applied: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
  interview: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
  rejected: 'text-red-600 bg-red-50 dark:bg-red-950/30',
  offer: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30',
};

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null;
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `${fmt(min)}+`;
  return null;
}

export default function TrackerPage() {
  const [apps, setApps] = useState<Application[]>(MOCK_APPLICATIONS);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ApplicationStatus | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [addingTo, setAddingTo] = useState<ApplicationStatus | null>(null);
  const [newCompany, setNewCompany] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const getColumnApps = (status: ApplicationStatus) =>
    apps.filter((a) => a.status === status);

  const moveApp = (appId: string, newStatus: ApplicationStatus) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === appId
          ? { ...a, status: newStatus, updated_at: new Date().toISOString() }
          : a
      )
    );
  };

  const deleteApp = (appId: string) => {
    setApps((prev) => prev.filter((a) => a.id !== appId));
    if (selectedApp?.id === appId) setSelectedApp(null);
    toast.success('Application removed');
  };

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    setDraggedId(appId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    if (draggedId) {
      moveApp(draggedId, status);
      toast.success(`Moved to ${status}`);
    }
    setDraggedId(null);
    setDragOverColumn(null);
  };

  const addNewApp = () => {
    if (!newCompany.trim() || !newTitle.trim() || !addingTo) return;
    const newApp: Application = {
      id: Date.now().toString(),
      user_id: 'mock',
      company_name: newCompany,
      job_title: newTitle,
      job_url: null,
      job_description: null,
      status: addingTo,
      salary_min: null,
      salary_max: null,
      location: null,
      is_remote: false,
      notes: null,
      applied_date: null,
      interview_date: null,
      tags: [],
      match_percentage: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setApps((prev) => [...prev, newApp]);
    setNewCompany('');
    setNewTitle('');
    setAddingTo(null);
    toast.success('Application added!');
  };

  return (
    <AppShell title="Applications" description="Track all your job applications">
      <div className="p-6 max-w-full">
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          {COLUMNS.map((col) => {
            const count = getColumnApps(col.id).length;
            return (
              <div key={col.id} className="flex items-center gap-2">
                <col.icon className={`w-4 h-4 ${col.color}`} />
                <span className="text-sm font-medium text-muted-foreground">{col.label}:</span>
                <span className="text-sm font-bold text-foreground">{count}</span>
              </div>
            );
          })}
          <div className="ml-auto">
            <Badge variant="secondary" className="text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Drag cards to update status
            </Badge>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {COLUMNS.map((col) => {
            const colApps = getColumnApps(col.id);
            const isDragTarget = dragOverColumn === col.id;

            return (
              <div
                key={col.id}
                className="flex-shrink-0 w-[280px]"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverColumn(col.id);
                }}
                onDragLeave={() => setDragOverColumn(null)}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                <div className={`flex items-center justify-between px-3 py-2 rounded-xl mb-3 ${col.headerBg}`}>
                  <div className="flex items-center gap-2">
                    <col.icon className={`w-4 h-4 ${col.color}`} />
                    <span className="text-sm font-semibold text-foreground">{col.label}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      colApps.length > 0 ? `${col.headerBg} ${col.color}` : 'text-muted-foreground'
                    }`}>
                      {colApps.length}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6"
                    onClick={() => setAddingTo(col.id)}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div
                  className={`min-h-[400px] rounded-xl transition-colors p-1 space-y-2.5 ${
                    isDragTarget ? 'bg-primary/5 border-2 border-dashed border-primary/30' : 'bg-transparent'
                  }`}
                >
                  {addingTo === col.id && (
                    <Card className="p-3 border-primary/30 bg-primary/5">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Company name"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        className="w-full text-sm bg-transparent border-b border-border mb-2 pb-1 outline-none placeholder:text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Job title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addNewApp()}
                        className="w-full text-sm bg-transparent border-b border-border mb-3 pb-1 outline-none placeholder:text-muted-foreground"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" className="h-7 text-xs flex-1" onClick={addNewApp}>Add</Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setAddingTo(null)}>Cancel</Button>
                      </div>
                    </Card>
                  )}

                  {colApps.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      app={app}
                      onDragStart={handleDragStart}
                      onSelect={() => setSelectedApp(app)}
                      onDelete={deleteApp}
                      onMove={moveApp}
                      isDragging={draggedId === app.id}
                    />
                  ))}

                  {colApps.length === 0 && addingTo !== col.id && (
                    <div
                      className="h-24 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-colors"
                      onClick={() => setAddingTo(col.id)}
                    >
                      <Plus className="w-5 h-5 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground">Add application</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-lg">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center font-bold text-sm">
                    {selectedApp.company_name[0]}
                  </div>
                  <div>
                    <div>{selectedApp.job_title}</div>
                    <div className="text-sm font-normal text-muted-foreground">{selectedApp.company_name}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {selectedApp.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedApp.location}
                    </span>
                  )}
                  {formatSalary(selectedApp.salary_min, selectedApp.salary_max) && (
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      {formatSalary(selectedApp.salary_min, selectedApp.salary_max)}
                    </span>
                  )}
                  {selectedApp.applied_date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Applied {selectedApp.applied_date}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Move to</p>
                  <div className="flex flex-wrap gap-2">
                    {COLUMNS.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => {
                          moveApp(selectedApp.id, col.id);
                          setSelectedApp({ ...selectedApp, status: col.id });
                          toast.success(`Moved to ${col.label}`);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          selectedApp.status === col.id
                            ? `${statusColors[col.id]} border-transparent`
                            : 'border-border text-muted-foreground hover:border-foreground/30'
                        }`}
                      >
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedApp.notes && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">{selectedApp.notes}</p>
                  </div>
                )}

                {selectedApp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApp.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {selectedApp.job_url && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={selectedApp.job_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        View job
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteApp(selectedApp.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function ApplicationCard({
  app,
  onDragStart,
  onSelect,
  onDelete,
  onMove,
  isDragging,
}: {
  app: Application;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onSelect: () => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: ApplicationStatus) => void;
  isDragging: boolean;
}) {
  const salaryText = formatSalary(app.salary_min, app.salary_max);

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, app.id)}
      onClick={onSelect}
      className={`p-3.5 cursor-pointer transition-all duration-150 border-border group ${
        isDragging ? 'opacity-40 scale-95 rotate-1' : 'hover:border-primary/30 hover:shadow-sm card-hover'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground/60 shrink-0 cursor-grab" />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">{app.company_name}</h4>
            <p className="text-xs text-muted-foreground truncate">{app.job_title}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="w-6 h-6 opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            {COLUMNS.filter((c) => c.id !== app.status).map((col) => (
              <DropdownMenuItem
                key={col.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(app.id, col.id);
                }}
              >
                Move to {col.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(app.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
        {app.location && (
          <span className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3" />
            {app.is_remote ? 'Remote' : app.location.split(',')[0]}
          </span>
        )}
        {salaryText && (
          <span className="flex items-center gap-0.5">
            <DollarSign className="w-3 h-3" />
            {salaryText}
          </span>
        )}
      </div>

      {app.match_percentage > 0 && (
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${app.match_percentage}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{app.match_percentage}%</span>
        </div>
      )}

      {app.interview_date && (
        <div className="mt-2 flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 rounded-md px-2 py-1">
          <Calendar className="w-3 h-3" />
          Interview {new Date(app.interview_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      )}
    </Card>
  );
}
