"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white text-2xl font-bold">PD</span>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">
              POCTAL
            </CardTitle>
            <p className="text-slate-300 mt-2">
              Sign in to manage your projects
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-600 bg-slate-700/80 backdrop-blur-sm px-4 py-3 text-sm font-medium text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-600 bg-slate-700/80 backdrop-blur-sm px-4 py-3 text-sm font-medium text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                >
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 h-12 rounded-xl font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <span className="relative bg-slate-800/90 px-3 text-xs text-slate-400">OR</span>
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-slate-700 border border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 h-12 rounded-xl font-semibold flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-700"></div>
                    Connecting...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.138-.112-.25-.25-.25H2.75c-.138 0-.25.112-.25-.25V6.75c0-.138.112-.25.25-.25h19.5c.138 0 .25.112.25.25v5.25c0 .138-.112.25-.25.25H23c.138 0 .25-.112.25-.25V12.5c0-.138-.112-.25-.25-.25zm-11.56.5c0-.138.112-.25.25-.25H2.688c-.138 0-.25.112-.25-.25V8.688c0-.138.112-.25-.25-.25h8.063c.138 0 .25.112.25.25v3.563c0 .138.112.25.25.25zm-11.56 5.5c0-.138.112-.25.25-.25H2.688c-.138 0-.25.112-.25-.25v-3.563c0-.138.112-.25-.25-.25h8.063c.138 0 .25.112.25.25v3.563c0 .138.112.25.25.25z"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-slate-600">
              <div className="mt-4 pt-4 border-t border-slate-700">
                <Button
                  variant="link"
                  onClick={() => router.push("/forgot-password")}
                  className="text-blue-400 hover:text-blue-300 text-sm p-0 h-auto font-normal"
                >
                  Forgot your password?
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
