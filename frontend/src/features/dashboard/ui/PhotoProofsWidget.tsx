import { ImagePlus } from 'lucide-react'
import type { PhotoProof } from '../model/dashboardTypes'
import type { PhotoProofsWidgetModel } from '../model/dashboardTypes'

type PhotoProofsWidgetProps = PhotoProofsWidgetModel & {
  onAddProof?: () => void
  onViewAll?: () => void
}

function ProofTile({ proof }: { proof: PhotoProof }) {
  return (
    <div className="space-y-2">
      <div className="aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-colors cursor-pointer group">
        <img
          alt={proof.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          src={proof.imageUrl}
        />
      </div>
      <p className="text-[10px] text-muted-foreground truncate font-medium">{proof.title}</p>
    </div>
  )
}

export function PhotoProofsWidget({
  title,
  viewAllLabel,
  addLabel,
  proofs,
  onAddProof,
  onViewAll,
}: PhotoProofsWidgetProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-primary" aria-hidden="true" />
          {title}
        </h3>
        <a
          className="text-xs text-primary font-bold hover:underline"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onViewAll?.()
          }}
        >
          {viewAllLabel}
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {proofs.map((proof) => (
          <ProofTile key={proof.id} proof={proof} />
        ))}

        <div className="space-y-2">
          <button
            type="button"
            className="aspect-square rounded-xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={onAddProof}
            aria-label={addLabel}
          >
            <span className="text-muted-foreground group-hover:text-white transition-colors">
              <ImagePlus className="h-5 w-5" />
            </span>
          </button>
          <p className="text-[10px] text-muted-foreground truncate font-medium">{addLabel}</p>
        </div>
      </div>
    </section>
  )
}

