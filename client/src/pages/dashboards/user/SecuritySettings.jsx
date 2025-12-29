import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShield,
  FiLock,
  FiKey,
  FiSmartphone,
  FiMail,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiLogOut,
  FiTrash2,
  FiRefreshCw,
  FiClock,
  FiGlobe,
  FiActivity
} from 'react-icons/fi';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';

const SecuritySettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, USA',
      ip: '192.168.1.1',
      lastActive: '5 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Los Angeles, USA',
      ip: '192.168.1.2',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: 3,
      device: 'Firefox on MacOS',
      location: 'Chicago, USA',
      ip: '192.168.1.3',
      lastActive: '1 day ago',
      current: false
    }
  ]);

  const [loginHistory, setLoginHistory] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, USA',
      time: '2024-01-15 14:30',
      status: 'success'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Los Angeles, USA',
      time: '2024-01-14 10:20',
      status: 'success'
    },
    {
      id: 3,
      device: 'Unknown Device',
      location: 'Unknown Location',
      time: '2024-01-13 22:45',
      status: 'failed'
    }
  ]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Change password:', passwordData);
    alert('Password changed successfully!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleToggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowTwoFactorModal(true);
    } else {
      setTwoFactorEnabled(false);
      alert('Two-factor authentication disabled');
    }
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowTwoFactorModal(false);
    alert('Two-factor authentication enabled successfully!');
  };

  const handleTerminateSession = (sessionId) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    alert('Session terminated successfully!');
  };

  const handleTerminateAllSessions = () => {
    setSessions(sessions.filter(s => s.current));
    alert('All other sessions terminated!');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account requested');
    alert('Account deletion request submitted. You will receive a confirmation email.');
    setShowDeleteAccountModal(false);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <FiShield className="text-2xl text-white" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">Security Settings</h1>
            </div>
            <p className="text-gray-600">Manage your account security and privacy</p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Security Status */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl border border-green-200/50 p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <FiCheck className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Account Security: Strong</h3>
                  <p className="text-sm text-gray-600">Your account is well protected</p>
                </div>
              </div>
              <Badge variant="success" size="lg">
                <FiShield /> Verified
              </Badge>
            </div>
          </motion.div>

          {/* Change Password */}
          <motion.div variants={itemVariants} className="glass rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <FiLock className="text-xl text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={passwordData.oldPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showOldPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                
                {/* Password Strength Meter */}
                {passwordData.newPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                  >
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Strength: <span className="font-semibold">{strengthLabels[passwordStrength - 1] || 'Very Weak'}</span>
                    </p>
                  </motion.div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" icon={FiCheck} fullWidth>
                Update Password
              </Button>
            </form>
          </motion.div>

          {/* Two-Factor Authentication */}
          <motion.div variants={itemVariants} className="glass rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FiSmartphone className="text-xl text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={handleToggleTwoFactor}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {twoFactorEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-green-800">
                  <FiCheck className="text-green-600" />
                  <span className="font-semibold">Two-factor authentication is enabled</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Active Sessions */}
          <motion.div variants={itemVariants} className="glass rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiGlobe className="text-xl text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Active Sessions</h2>
              </div>
              <Button variant="outline" size="sm" icon={FiLogOut} onClick={handleTerminateAllSessions}>
                End All
              </Button>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`p-4 rounded-xl border transition-all ${
                    session.current
                      ? 'bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{session.device}</p>
                        {session.current && (
                          <Badge variant="success" size="sm">Current</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-primary-500" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="text-purple-500" />
                          {session.lastActive}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">IP: {session.ip}</p>
                    </div>
                    {!session.current && (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={FiLogOut}
                        onClick={() => handleTerminateSession(session.id)}
                      >
                        End
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Login History */}
          <motion.div variants={itemVariants} className="glass rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiActivity className="text-xl text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Recent Login Activity</h2>
            </div>

            <div className="space-y-3">
              {loginHistory.map((login) => (
                <motion.div
                  key={login.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{login.device}</p>
                        <Badge variant={login.status === 'success' ? 'success' : 'error'} size="sm">
                          {login.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-primary-500" />
                          {login.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="text-purple-500" />
                          {login.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl border-2 border-red-200 p-6 bg-red-50/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <FiAlertCircle className="text-xl text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
            </div>
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="danger"
              icon={FiTrash2}
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Delete Account
            </Button>
          </motion.div>
        </motion.div>

        {/* Two-Factor Setup Modal */}
        <Modal
          isOpen={showTwoFactorModal}
          onClose={() => setShowTwoFactorModal(false)}
          title="Enable Two-Factor Authentication"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-4">
                <FiSmartphone className="text-4xl text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan QR Code</h3>
              <p className="text-sm text-gray-600 mb-4">
                Use your authenticator app to scan this QR code
              </p>
              
              {/* Placeholder QR Code */}
              <div className="inline-block p-4 bg-white border-2 border-gray-300 rounded-xl">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">QR Code</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code
              </label>
              <input
                type="text"
                placeholder="000000"
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowTwoFactorModal(false)} fullWidth>
                Cancel
              </Button>
              <Button variant="primary" icon={FiCheck} onClick={handleEnable2FA} fullWidth>
                Enable
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          isOpen={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
          title="Delete Account"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <FiAlertCircle className="text-3xl text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you absolutely sure?</h3>
              <p className="text-sm text-gray-600">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> All your bookings, payment methods, and profile information will be permanently deleted.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                placeholder="DELETE"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowDeleteAccountModal(false)} fullWidth>
                Cancel
              </Button>
              <Button variant="danger" icon={FiTrash2} onClick={handleDeleteAccount} fullWidth>
                Delete My Account
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
