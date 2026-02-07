import { motion } from 'framer-motion';
import { Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-card-background border-t border-primary/20 py-12">
      <div className="max-w-[100rem] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-foreground">
            <Code2 className="text-accent-teal" size={20} />
            <p className="font-paragraph text-sm">
              © 2026 Priyabrata Subhransu Behera
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <p className="font-paragraph text-sm text-muted-gray">
              Innovating through Code & Curiosity
            </p>
            <Heart className="text-accent-magenta" size={16} fill="currentColor" />
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse" />
              <p className="font-paragraph text-xs text-muted-gray">
                Built with React, TypeScript & Framer Motion
              </p>
              <div className="w-2 h-2 bg-accent-magenta rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
