export default function RootLoading() {
    return (
      <div className="fixed inset-0 bg-ivory flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
  
          {/* NIVA logo */}
          <p className="font-cormorant italic text-4xl text-espresso tracking-widest">
            NIVA
          </p>
  
          {/* Animated underline */}
          <div className="w-12 h-px bg-soft-blush overflow-hidden">
            <div className="h-full bg-dusty-rose animate-[shimmer_1.5s_ease-in-out_infinite]" />
          </div>
  
        </div>
      </div>
    )
  }