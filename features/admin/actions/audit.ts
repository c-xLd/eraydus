'use server'

import { createClient } from '@/services/supabase/server'

type LogActivityParams = {
  actionType: 'create' | 'update' | 'delete' | 'view' | 'export'
  resourceType: 'product' | 'quote' | 'customer' | 'content' | 'settings' | string
  resourceId?: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
}

/**
 * Logs an administrative action into the activity_logs table for security audit purposes.
 * This should be called from secure Server Actions after verifying user authorization.
 */
export async function logActivity(params: LogActivityParams) {
  try {
    const supabase = await createClient()
    
    // Get the current user performing the action
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('activity_logs').insert({
      user_id: user.id,
      action_type: params.actionType,
      resource_type: params.resourceType,
      resource_id: params.resourceId,
      old_values: params.oldValues || null,
      new_values: params.newValues || null
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
    // We intentionally don't throw to prevent breaking the main operation if audit logging fails
  }
}
