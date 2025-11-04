// Optimized solution
type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const userMap = new Map<number, { duration: number; equipment: Set<string> }>();

  for (const session of sessions) {
    if (userMap.has(session.user)) {
      const existing = userMap.get(session.user)!;
      existing.duration += session.duration;
      
      // Add equipment to set (automatically handles duplicates)
      for (const item of session.equipment) {
        existing.equipment.add(item);
      }
    } else {
      userMap.set(session.user, {
        duration: session.duration,
        equipment: new Set(session.equipment)
      });
    }
  }

  // Convert to final format
  return Array.from(userMap.entries()).map(([user, data]) => ({
    user,
    duration: data.duration,
    equipment: [...data.equipment].sort()
  }));
}


// Initial solution
type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const uniqueIds: Set<number> = new Set(), duplicateIds = new Set();
  const merged: Session[] = [];

  for (const session of sessions) {
    if (uniqueIds.has(session.user)) {
      duplicateIds.add(session.user);
    } else {
      uniqueIds.add(session.user);
    }
  }

  for (const id of uniqueIds) {
    const mergedSession: Session = {user: id, duration: 0, equipment: []}, isDuplicate = duplicateIds.has(id);

    for (const session of sessions) {
      if (session.user === id) {
        mergedSession.duration += session.duration;
        mergedSession.equipment = Array.from(new Set([...mergedSession.equipment, ...session.equipment].sort()).values());

        if (!isDuplicate) break;
      }
    }

    merged.push(mergedSession);
  }
  
  return merged;
}