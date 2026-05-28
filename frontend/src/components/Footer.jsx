export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xl font-extrabold text-white tracking-tight">AXIONFORGE</span>
        <p className="text-gray-600 text-sm">Not Just Learning. Building.</p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="mailto:axionforge.in@gmail.com" className="hover:text-white transition-colors">Contact</a>
          <span>© {new Date().getFullYear()} AXIONFORGE LLP</span>
        </div>
      </div>
    </footer>
  )
}
