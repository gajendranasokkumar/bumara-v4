import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex-1 overflow-auto">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-card/60 backdrop-blur">
                <Shield className="h-3.5 w-3.5" /> Compliance-first ERP
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mt-4">
                Run your business with confidence
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                All your operations in one modern platform—Compliance, Accounting, Inventory, CRM, Payroll, Documents—
                supercharged by AI.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Link href={{ pathname: "/dashboard", query: { onboarded: "1" } }}>
                  <Button size="lg" className="gap-2">
                    <Zap className="h-4 w-4" /> Get Started
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">Explore Features</Button>
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Quick Setup</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> AI Insights</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Secure</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[16/10] w-full rounded-xl border bg-card/80 backdrop-blur flex items-center justify-center shadow-sm">
                <div className="text-center px-6">
                  <div className="text-sm uppercase tracking-widest text-muted-foreground">Bumara ERP</div>
                  <div className="text-2xl font-semibold mt-2">Beautiful. Fast. Unified.</div>
                  <p className="text-sm text-muted-foreground mt-3">Compliance-first ERP with AI superpowers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-background/50">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border bg-card">
              <div className="text-sm font-semibold">Compliance</div>
              <p className="text-sm text-muted-foreground mt-2">Deadlines, filings, and documents in one place.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="text-sm font-semibold">AI Assistant</div>
              <p className="text-sm text-muted-foreground mt-2">Ask questions, get insights, and automate work.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="text-sm font-semibold">Unified Modules</div>
              <p className="text-sm text-muted-foreground mt-2">Accounting, CRM, Inventory, Payroll, and more.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-card/40">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Trusted by teams</div>
            <h2 className="text-2xl font-semibold mt-2">Join modern businesses using Bumara</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border bg-background">
              <p className="text-sm text-muted-foreground">“Bumara simplified our compliance process. Deadlines, filings, and docs are finally in sync.”</p>
              <div className="mt-4 text-sm font-medium">Alex Morgan</div>
              <div className="text-xs text-muted-foreground">COO, Luma Tech</div>
            </div>
            <div className="p-6 rounded-lg border bg-background">
              <p className="text-sm text-muted-foreground">“The AI tips saved us hours every week. Our team loves the integrated modules.”</p>
              <div className="mt-4 text-sm font-medium">Priya Sharma</div>
              <div className="text-xs text-muted-foreground">Head of Ops, Nova</div>
            </div>
            <div className="p-6 rounded-lg border bg-background">
              <p className="text-sm text-muted-foreground">“Beautiful UI, sensible workflows, and reliable performance.”</p>
              <div className="mt-4 text-sm font-medium">Samuel Diaz</div>
              <div className="text-xs text-muted-foreground">CFO, Brightline</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to streamline your operations?</h3>
          <p className="text-muted-foreground mt-2">Get started in minutes and scale with confidence.</p>
          <div className="mt-6">
            <Link href={{ pathname: "/dashboard", query: { onboarded: "1" } }}>
              <Button size="lg" className="gap-2">
                <Zap className="h-4 w-4" /> Start Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
