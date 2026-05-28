import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { useModalStore } from '../store/modalStore'
import { submitApplication } from '../services/api'

export default function ApplyModal() {
  const { close, program } = useModalStore()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      setTimeout(close, 2000)
    },
  })

  const onSubmit = (data) => mutation.mutate({ ...data, program })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.2)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {program === 'register' ? 'Register Interest' : `Apply — ${program ? program.charAt(0).toUpperCase() + program.slice(1) : ''} Program`}
            </h3>
            <button onClick={close} className="text-gray-500 hover:text-white transition-colors text-2xl leading-none">×</button>
          </div>

          {mutation.isSuccess ? (
            <div className="text-center py-8">
              <p className="text-emerald-400 text-lg font-semibold">Application Received!</p>
              <p className="text-gray-500 text-sm mt-2">We'll reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <input
                  {...register('college')}
                  placeholder="College / Institution"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="mt-2 w-full py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-all duration-300"
              >
                {mutation.isPending ? 'Submitting...' : 'Submit Application'}
              </button>

              {mutation.isError && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
