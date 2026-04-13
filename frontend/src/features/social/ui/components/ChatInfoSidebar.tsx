import { FileText, Phone, ShieldOff, Table, Video, VolumeX } from 'lucide-react'
import type { ContactInfo } from '../../model/chatTypes'

export function ChatInfoSidebar({ contact }: { contact: ContactInfo }) {
  return (
    <aside className="w-72 shrink-0 border-l border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-y-auto h-full">
      {/* Contact card */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4">
        <img
          src={contact.avatarUrl}
          alt={contact.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/30"
        />
        <h3 className="text-white font-bold mt-3">{contact.name}</h3>
        <p className="text-xs text-muted-foreground">{contact.title}</p>
        <span className="mt-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          ● {contact.team}
        </span>
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-4 flex items-center justify-center gap-2">
        {[
          { icon: Phone, label: 'Call' },
          { icon: Video, label: 'Video' },
          { icon: VolumeX, label: 'Mute' },
          { icon: ShieldOff, label: 'Block' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* Shared Media */}
      <section className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Shared Media</h4>
          <button className="text-[10px] text-primary font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {contact.sharedMedia.slice(0, 6).map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Media ${i + 1}`}
              className="w-full aspect-square rounded-lg object-cover border border-white/10"
            />
          ))}
          {contact.sharedMedia.length > 6 && (
            <div className="w-full aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-muted-foreground">
              +{contact.sharedMedia.length - 6}
            </div>
          )}
        </div>
      </section>

      {/* Shared Files */}
      <section className="px-4 pb-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Shared Files</h4>
        <div className="space-y-2">
          {contact.sharedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                {file.icon === 'spreadsheet' ? (
                  <Table className="h-4 w-4 text-emerald-400" />
                ) : (
                  <FileText className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {file.size} · {file.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  )
}
